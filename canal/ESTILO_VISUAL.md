# Estilo visual: ilustraciones 2D

Estilo aprobado por Vicente el 27-11-2026. Lo usa la fase de imágenes 2D.

## Estilo C (definitivo)

El **Pokémon** va dibujado con cuidado y precisión, con sombreado limpio de crayón y volumen marcado.
El **fondo** va en trazos de crayón más sueltos y expresivos.
El resultado es una ilustración profesional, **nunca un dibujo infantil**.

### Imágenes de referencia aprobadas (Higgsfield, Nano Banana 2)

Se pasan como `image_references` en cada generación para mantener el estilo uniforme entre vídeos.

| Referencia | job_id | Qué hace bien |
|---|---|---|
| Bosque con luz filtrada | `541a117f-83ca-49de-8208-989a96fb548d` | Haces de luz, manchas de sol en el suelo, ambiente |
| Pueblo después de la lluvia | `48d22fb7-d90d-427c-883d-4184b1bc87e3` | Huellas de barro, reflejo en el charco, luz que se abre entre nubes |

### Correcciones aprendidas

- **Sombra de contacto obligatoria:** el Pokémon siempre proyecta sombra sobre la superficie en la que está (roca, suelo, agua). En la referencia del bosque faltaba.
- **Las huellas deben corresponder al Pokémon:** tamaño y forma según sus patas (número de dedos, tamaño del cuerpo). En la referencia de la lluvia eran demasiado grandes y ovaladas.

## Plantilla de prompt

```
{ESCENA: qué hace el Pokémon y dónde}.
Mixed style: {POKÉMON} drawn carefully and precisely with clean crayon shading and strong volume,
while the background is loose, expressive crayon strokes. Professional illustrator quality, not childish.
Lighting: {LUZ: hora del día, dirección del sol, tiempo}. {POKÉMON} casts a clear contact shadow
consistent with that light{, plus long/short shadow según la altura del sol}.
{RASTROS si camina: small footprints matching {POKÉMON}'s feet size and shape, in the {mud/snow/sand}}.
Vibrant saturated colors. Wide cinematic composition, 16:9, no text.
```

- Modelo: `nano_banana_2`, 16:9, 1k (1,5 créditos por imagen).
- Referencias: las dos `job_id` de arriba como `image_references`.
- **No usar GPT Image:** bloquea a los personajes de Pokémon.

## Estrategia de ahorro

1. **Biblioteca de fondos reutilizables** (`assets/fondos/`): paisajes sin Pokémon en el mismo estilo, organizados por hábitat y luz (bosque-día, bosque-atardecer, playa, cueva, montaña nevada, ciudad, mar, cielo…). Cada fondo nuevo se añade al catálogo y antes de generar uno se comprueba si ya existe.
2. **Escenas completas solo en los momentos clave**: cuando el Pokémon interactúa con el entorno (sombras, huellas, reflejos), se genera integrado en la escena. No se pega un recorte sobre un fondo.
3. **Remotion convierte una imagen en varios planos**, sin gastar créditos:
   - zoom lento (Ken Burns) y recorridos de cámara;
   - parallax por capas (profundidad);
   - partículas y ambiente: lluvia, hojas, polvo en la luz, niebla;
   - cambios sutiles de luz o color sobre la imagen.

   Una imagen bien aprovechada cubre entre 15 y 20 segundos de vídeo.
