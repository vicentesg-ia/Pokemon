#!/usr/bin/env python3
"""Prepara un vídeo para Remotion.

Uso: python3 herramientas/preparar-montaje.py 001-bulbasaur

- Copia (enlaza) los assets del vídeo a remotion/public/<video>/ (carpeta ignorada por git).
- Genera remotion/src/data/<video>.json con el plan de montaje y las duraciones reales
  de la voz de cada escena en ES y EN (audio/duraciones.json).
"""
import json
import os
import re
import shutil
import subprocess
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOZ_LUFS = -18.0  # las voces de los dos idiomas se igualan a este nivel
AMBIENTAL_SEG = 900  # la pista ambiental se alarga a 15 min (sin <Audio loop>, que dejaba huecos al renderizar por tramos)


def lufs(rutas):
    """Sonoridad integrada (LUFS) del conjunto de archivos, como si fueran uno."""
    lista = os.path.join(os.path.dirname(rutas[0]), '_lista.txt')
    open(lista, 'w').write(''.join(f"file '{r}'\n" for r in rutas))
    out = subprocess.run(['ffmpeg', '-hide_banner', '-f', 'concat', '-safe', '0', '-i', lista,
                          '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    os.remove(lista)
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', out)[-1])


def igualar_voces(pub):
    """Aplica a cada idioma una ganancia fija para dejar su voz en VOZ_LUFS (respeta la dinámica)."""
    for lang in ('es', 'en'):
        d = os.path.join(pub, lang)
        rutas = sorted(os.path.join(d, f) for f in os.listdir(d) if f.endswith('.mp3'))
        ganancia = VOZ_LUFS - lufs(rutas)
        for r in rutas:
            tmp = r + '.tmp.mp3'
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', r, '-af', f'volume={ganancia:.2f}dB',
                            '-c:a', 'libmp3lame', '-b:a', '192k', tmp], check=True)
            os.replace(tmp, r)
        print(f'voz {lang}: {ganancia:+.1f} dB')


def alargar_ambiental(pub):
    m = os.path.join(pub, 'musica')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-stream_loop', '-1', '-i', os.path.join(m, 'ambiental.mp3'),
                    '-t', str(AMBIENTAL_SEG), '-c:a', 'libmp3lame', '-b:a', '192k',
                    os.path.join(m, 'ambiental-larga.mp3')], check=True)


def main(video: str) -> None:
    vdir = os.path.join(RAIZ, 'videos', video)
    plan = json.load(open(os.path.join(vdir, 'montaje', 'plan.json'), encoding='utf-8'))
    dur = json.load(open(os.path.join(vdir, 'audio', 'duraciones.json'), encoding='utf-8'))

    pub = os.path.join(RAIZ, 'remotion', 'public', video)
    os.makedirs(pub, exist_ok=True)
    carpetas = ['ilustraciones', 'clips', 'cartas', 'audio/es', 'audio/en', 'audio/sfx', 'audio/musica']
    for c in carpetas:
        src = os.path.join(vdir, c)
        dst = os.path.join(pub, c.replace('audio/', ''))
        if os.path.isdir(dst):
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
    igualar_voces(pub)
    alargar_ambiental(pub)

    for e in plan['escenas']:
        for lang in ('es', 'en'):
            if e['id'] not in dur[lang]:
                sys.exit(f"Falta la voz {lang} de la escena {e['id']}")
            e.setdefault('voz', {})[lang] = {'src': f"{lang}/{e['id']}.mp3", 'dur': dur[lang][e['id']]}

    plan['raiz'] = video
    salida = os.path.join(RAIZ, 'remotion', 'src', 'data', f'{video}.json')
    os.makedirs(os.path.dirname(salida), exist_ok=True)
    json.dump(plan, open(salida, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for lang in ('es', 'en'):
        total = sum(e['voz'][lang]['dur'] + plan['padding'] for e in plan['escenas'])
        print(f"{lang}: {len(plan['escenas'])} escenas, {total/60:.2f} min")
    print('Assets en', pub)


if __name__ == '__main__':
    main(sys.argv[1])
