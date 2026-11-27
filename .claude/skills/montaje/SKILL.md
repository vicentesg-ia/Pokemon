---
name: montaje
description: Fase 7 de producción del canal Crónicas del Entrenador / Trainer Chronicles. Monta y renderiza en Remotion los dos vídeos (ES y EN) a partir de las ilustraciones, los clips, las fotos de cartas y el audio, y prepara subtítulos y descripciones. Úsala cuando el audio esté aprobado y el usuario pida el montaje, el render o el vídeo final.
---

# Fase 7: montaje en Remotion

Requisitos: guion, ilustraciones, clips y audio aprobados. Lee BIBLIA §5 (estilo), §10 (música) y §11 (montaje).

## Estructura
- `remotion/`: proyecto común a todos los vídeos.
  - `src/Video.tsx`: une las escenas, la voz, la música (ambiental en bucle y épica en las escenas marcadas) y los efectos.
  - `src/componentes.tsx`: los bloques de imagen (ver tabla).
  - `src/estilo.tsx`: colores, fuentes y filtros de crayón.
  - `src/Root.tsx`: registra las composiciones `V<NNN>-ES` y `V<NNN>-EN`. **Añade cada vídeo nuevo aquí** (import del JSON y entrada en `videos`).
  - `public/fuentes/`: fuentes en local (versionadas). El navegador de render no puede bajarlas de Google Fonts.
  - `public/<video>/`: assets copiados (no se versionan).
- `videos/<NNN>/montaje/plan.json`: **el plan de montaje del vídeo**. Es lo único que se escribe para cada vídeo.
- `herramientas/preparar-montaje.py <video>`: copia los assets a `remotion/public/<video>/` y genera `remotion/src/data/<video>.json` con las duraciones reales de la voz.
- `herramientas/subtitulos.py <video>`: genera los `.srt` ES y EN en `videos/<NNN>/publicacion/`.

## Tipos de plano (`shots[].tipo`)
| Tipo | Uso | Campos |
|---|---|---|
| `ilu` | Ilustración con movimiento de cámara | `src`, `mov` (`in`, `out`, `left`, `right`, `up`), `particulas` |
| `clip` | Clip realista | `src`, `desde` (s), `dur` (s) opcional |
| `blanco` | Destello blanco que se desvanece (tras el Rayo Solar) | — |
| `grafico` | Gráfico en crayón sobre papel (`pokedex001`, `alreves`, `nombre`, `podio`). Para un Pokémon nuevo, añade su gráfico en `Grafico` | `grafico` |
| `carta` | 1 o 2 fotos **reales** de cartas, con giro 3D, brillo y contador de precio | `cartas`, `precio` {es, en, moneda_es, nota_es, exacto}, `precio_izq`, `etiqueta`, `brillo` |
| `record` | Carta y línea de tiempo de 3 ventas (personalizable en `EscenaRecord`) | `carta` |

- Si una escena tiene varios planos, se reparten por `peso` (los planos con `dur` usan su duración exacta).
- `rotulo`: `tipo` (`ficha`, `dato`, `precio`, `titular`), `at` en segundos (o relativo 0-1 con `relativo: true`) y líneas `es`/`en`.
- `sfx`: `src`, `at` (negativo = contado desde el final de la escena) y `vol`.
- `musica`: `ambiental` o `epica`.
- Duración de cada escena = voz + `padding` (0,45 s).

## Proceso
1. Escribe `videos/<NNN>/montaje/plan.json` a partir del guion (copia el de `001-bulbasaur` como plantilla).
2. Ejecuta `python3 herramientas/preparar-montaje.py <video>` y registra el vídeo en `Root.tsx`.
3. Ejecuta `npx tsc --noEmit -p remotion` y `npx remotion compositions src/index.ts` (desde `remotion/`).
4. **Revisión con fotogramas antes del render:**
   - `npx remotion bundle src/index.ts --out-dir <scratch>/bundle`;
   - `npx remotion still <scratch>/bundle V<NNN>-ES <scratch>/<id>.jpg --frame=<n> --scale=0.5` en unas 12 escenas clave;
   - una hoja de contactos con Read. Corrige textos cortados, solapes y precios. Lección de #001: los textos largos de los gráficos se salen; usa `whiteSpace: nowrap` y tamaños prudentes.
5. **Render**: usa siempre `herramientas/render-por-tramos.sh V<NNN>-ES videos/<NNN>/render/<video>-ES.mp4` (y lo mismo para EN), **en segundo plano** (`run_in_background`).
   - Renderiza en tramos de 2000 fotogramas con reintentos. Si se corta, se relanza y continúa donde lo dejó. El audio se renderiza aparte y se une sin recomprimir.
   - Unos 7 minutos por tramo con 4 CPU: unos 60 minutos por idioma para un vídeo de 9 minutos.
   - Lección de #001: las fuentes **tienen que ir incrustadas** (`src/fuentes-b64.ts`). Cargarlas por URL se colgaba a mitad de render.
   - `videos/*/render/` no se sube a git (pesa mucho).
6. `python3 herramientas/subtitulos.py <video>` y escribe `publicacion/descripcion-ES.txt` y `-EN.txt` con capítulos (inicio de cada bloque), fuentes, aviso de contenido generado con IA y aviso de canal de fans.
7. Revisa los MP4: duración, audio (ffprobe) y fotogramas sueltos. Después pasa a la fase 8 (agente `revisor`).
8. Envía a Vicente el vídeo (o una versión comprimida si pesa mucho) y actualiza `estado.md` y `PLAN.md`.
