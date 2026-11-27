---
name: clips-realistas
description: Fase 5 de producción del canal Crónicas del Entrenador / Trainer Chronicles. Genera los clips realistas tipo documental de un vídeo (escenas CLIP del guion): primero el fotograma inicial con Nano Banana 2 y luego la animación con MAGI-2 en Higgsfield, revisando cada paso. Úsala cuando las ilustraciones estén aprobadas y el usuario pida los clips o los vídeos realistas.
---

# Fase 5: clips realistas (MAGI-2)

Requisitos: guion aprobado. Lee `canal/ESTILO_VISUAL.md` (sección de clips realistas: referencia, plantillas, costes).

## Planificación
- En el guion, cada escena `CLIP` dura en pantalla unos **8 s** (gancho) o **12-15 s** (momento épico).
- El montaje usa **planos de 0,5 a 3 s** (como la referencia): de cada clip de 5 s salen 2-3 planos. Necesitas **2 clips para ~8 s y 3 clips para ~12-15 s**.
- Cada clip es un **plano distinto** (macro, cara, plano general, acción, destello final), no el mismo plano repetido.
- Escribe el plan en `videos/<NNN>/clips/README.md`: escena → clip → descripción del fotograma → movimiento.

## Proceso
1. **Fotogramas iniciales** (Nano Banana 2, 16:9, 2k, unos 1,5 créditos cada uno), con la referencia realista aprobada `4bbabd0d-c598-4b72-a197-10ecc69469c1` como `image_references`.
   - Plantilla de `ESTILO_VISUAL.md`: documental de naturaleza, lente, profundidad de campo corta, luz con dirección, interacción física. Siempre "No text, no people".
2. **Revisa los fotogramas tú** (descárgalos y míralos con Read): fidelidad del Pokémon (forma, manchas, ojos rojos o anaranjados, bulbo), realismo y que no haya texto. Repite los que fallen **antes** de animar.
3. **Animación** con `generate_video_batch`:
   - `model: "magi_2"`, `duration: 5`, `aspect_ratio: "16:9"`, `generate_audio: false`, `medias: [{value: <job_id del fotograma>, role: "start_image"}]`.
   - Prompt: "Nature documentary shot. <acción física concreta>. <movimiento secundario>. <luz>. <movimiento de cámara>, shallow depth of field, realistic natural motion."
   - Unos 12,5 créditos por clip. Los vídeos tardan **varios minutos**: haz `jobs_wait` varias veces y, si tarda más de unos 3 minutos, programa una comprobación con `send_later` en lugar de quedarte esperando.
4. **Descarga** los MP4 a `videos/<NNN>/clips/<escena>-<n>.mp4` y extrae 3 fotogramas de cada uno con ffmpeg para **revisarlos**: deformaciones, Pokémon que cambia de cara, artefactos. Si un clip falla, repítelo una vez como mucho; si vuelve a fallar, avisa.
5. Actualiza el README (job_ids, estado), `estado.md` (créditos) y haz commit y push. Los MP4 pesan poco, así que se suben.
6. Muestra los clips a Vicente con `show_generation_by_ids` y una hoja de fotogramas, y espera su aprobación.
