---
name: ilustraciones
description: Fase 4 de producción del canal Crónicas del Entrenador / Trainer Chronicles. Genera las ilustraciones 2D en estilo crayón (estilo C) de un vídeo a partir de las escenas ILU / ILU-FONDO del guion aprobado, con Nano Banana 2 en Higgsfield, las revisa y las guarda. Úsala cuando título y miniatura estén elegidos y el usuario pida las ilustraciones o las imágenes del vídeo.
---

# Fase 4: ilustraciones en crayón

Requisitos: `guion.md` aprobado. Lee `canal/ESTILO_VISUAL.md` (estilo C, plantilla, correcciones) y BIBLIA §5.

## Reglas visuales (obligatorias)
- **Estilo C:** el Pokémon dibujado con cuidado y sombreado de crayón limpio; el fondo con trazos de crayón sueltos. Nunca infantil.
- **Sombra de contacto** siempre, coherente con la luz. **Huellas** del tamaño y la forma correctos si camina.
- La **luz** de la escena (hora del día, dirección del sol) se indica en el prompt.
- **Colores vivos.** **Sin personas** (ni niños, ni jugadores, ni siluetas humanas). **Sin texto** en la imagen: los rótulos los pone Remotion.
- Formato **16:9**. Las imágenes se mueven con zoom y recorridos en Remotion, así que deja aire alrededor del sujeto.

## Proceso
1. **Lista de escenas:** del guion, toma las `ILU` e `ILU-FONDO`. Antes de generar un fondo, mira `assets/fondos/CATALOGO.md`: si ya existe, reutilízalo.
2. **Prompts:** escríbelos en `videos/<NNN>/ilustraciones/prompts.json` con la plantilla de `ESTILO_VISUAL.md` (escena, luz, sombra, huellas, "no text, no people").
3. **Generación:** `generate_image_batch` con `nano_banana_2`, 16:9 y `resolution: "2k"`. Como `image_references` usa las 2 referencias de estilo (`541a117f-83ca-49de-8208-989a96fb548d` y `48d22fb7-d90d-427c-883d-4184b1bc87e3`). Lanza tandas de hasta 12.
4. **Descarga** de cloudfront a `videos/<NNN>/ilustraciones/<escena>.jpg` (JPG de 1920 px de ancho, calidad 90; no subas PNG enormes). Apunta el `job_id` de cada imagen.
5. **Revisión propia:** haz una hoja de contactos y mírala con Read. Rechaza y regenera si:
   - el Pokémon no se parece a su diseño oficial (colores, manchas, número de dedos);
   - falta la sombra o no es coherente con la luz;
   - hay personas, texto o letras;
   - el estilo no es el C (demasiado infantil o demasiado realista).

   Como mucho 2 reintentos por escena. Si sigue fallando, apúntalo y pregunta.
6. **Biblioteca de fondos:** las `ILU-FONDO` y las escenas reutilizables se copian a `assets/fondos/` y se apuntan en `CATALOGO.md` (hábitat, luz, vídeo de origen y job_id).
7. Escribe `videos/<NNN>/ilustraciones/README.md` con una tabla escena → archivo → job_id → estado, actualiza `estado.md` (con los créditos) y haz commit y push.
8. **Envía la hoja de contactos** a Vicente (SendUserFile) para que la apruebe y apunta sus cambios.
