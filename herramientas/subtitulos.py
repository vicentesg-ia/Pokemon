#!/usr/bin/env python3
"""Genera los subtítulos .srt (ES y EN) de un vídeo a partir del guion y de la duración de cada escena.

Uso: python3 herramientas/subtitulos.py 001-bulbasaur

Los tiempos salen del mismo cálculo que usa Remotion (voz + padding por escena), así que encajan con el render.
Dentro de cada escena, el texto se parte en frases cortas y el tiempo se reparte según su longitud.
"""
import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX = 84  # caracteres por subtítulo (2 líneas de 42)


def trozos(texto: str):
    frases = re.split(r'(?<=[.?!…:])\s+', texto.strip())
    out = []
    for f in frases:
        while len(f) > MAX:
            corte = f.rfind(',', 0, MAX)
            if corte < 20:
                corte = f.rfind(' ', 0, MAX)
            out.append(f[:corte + 1].strip())
            f = f[corte + 1:].strip()
        if f:
            out.append(f)
    # Une los trozos muy cortos ("Yep.", "verdad.") a su vecino para que no duren menos de ~0,7 s
    unidos = []
    for p in out:
        if unidos and (len(p) < 22 or len(unidos[-1]) < 22) and len(unidos[-1]) + len(p) + 1 <= (MAX + 16 if min(len(p), len(unidos[-1])) < 10 else MAX):
            unidos[-1] += ' ' + p
        else:
            unidos.append(p)
    return unidos


def dos_lineas(t: str) -> str:
    if len(t) <= 42:
        return t
    mitad = t.rfind(' ', 0, len(t) // 2 + 6)
    return t[:mitad] + '\n' + t[mitad + 1:]


def ts(s: float) -> str:
    ms = int(round(s * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    sec, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{sec:02},{ms:03}'


def main(video: str) -> None:
    vdir = os.path.join(RAIZ, 'videos', video)
    guion = open(os.path.join(vdir, 'guion.md'), encoding='utf-8').read()
    plan = json.load(open(os.path.join(RAIZ, 'remotion', 'src', 'data', f'{video}.json'), encoding='utf-8'))
    fps, pad = plan['fps'], plan['padding']
    textos = {}
    for sid, cuerpo in re.findall(r'^### (\d\.\d) · .+?\n(.*?)(?=^### |^## |\Z)', guion, re.M | re.S):
        textos[sid] = {l: re.search(rf'^\*\*{l.upper()}:\*\* (.*)$', cuerpo, re.M).group(1) for l in ('es', 'en')}
    os.makedirs(os.path.join(vdir, 'publicacion'), exist_ok=True)
    for lang in ('es', 'en'):
        t0, n, lineas = 0.0, 1, []
        for e in plan['escenas']:
            dur_voz = e['voz'][lang]['dur']
            total = round((dur_voz + pad) * fps) / fps
            partes = trozos(textos[e['id']][lang])
            peso = sum(len(p) for p in partes)
            t = t0 + 0.05
            for p in partes:
                d = dur_voz * len(p) / peso
                lineas.append(f'{n}\n{ts(t)} --> {ts(t + d - 0.05)}\n{dos_lineas(p)}\n')
                n += 1
                t += d
            t0 += total
        ruta = os.path.join(vdir, 'publicacion', f'{video}-{lang.upper()}.srt')
        open(ruta, 'w', encoding='utf-8').write('\n'.join(lineas))
        print(ruta, n - 1, 'subtítulos')


if __name__ == '__main__':
    main(sys.argv[1])
