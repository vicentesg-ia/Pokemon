#!/usr/bin/env python3
"""Prepara un vídeo para Remotion.

Uso: python3 herramientas/preparar-montaje.py 001-bulbasaur

- Copia (enlaza) los assets del vídeo a remotion/public/<video>/ (carpeta ignorada por git).
- Genera remotion/src/data/<video>.json con el plan de montaje y las duraciones reales
  de la voz de cada escena en ES y EN (audio/duraciones.json).
"""
import json
import os
import shutil
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


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
