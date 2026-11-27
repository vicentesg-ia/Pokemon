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

---

# Estilo visual: clips realistas (Higgsfield vídeo)

## Análisis del vídeo de referencia (aportado por Vicente)

Es un vídeo vertical de unos 100 segundos sobre la línea evolutiva Squirtle → Wartortle → Blastoise.
- **Realismo tipo documental de naturaleza con momentos épicos:** el Pokémon parece un animal real, con piel húmeda, textura del caparazón y gotas de agua.
- **Muchos planos macro y de detalle:** pata pisando la arena, ojo, caparazón. **Profundidad de campo corta**, con el fondo desenfocado.
- **Luz natural cinematográfica:** hora dorada en la playa, rayos de sol bajo el agua y escenas oscuras y dramáticas en las profundidades.
- **Mucha interacción física:** huellas en la arena, espuma, salpicaduras, burbujas, sombras sobre el fondo marino.
- **Hay una pequeña historia:** cría en la playa, después explora el mar, aparece una amenaza (Gyarados) y llega la evolución épica.
- **Montaje muy rápido:** 62 cortes en 100 segundos, con planos de **0,5 a 3 segundos** (unos 1,6 segundos de media).

## Uso en nuestros vídeos

- **1 o 2 momentos por vídeo:** uno de 5 a 10 segundos y otro de 10 a 15 segundos.
- Un clip realista sirve muy bien como **gancho de apertura** para retener al espectador.
- Formato **16:9** (nuestros vídeos son horizontales), sin audio generado: el sonido lo pone ElevenLabs.
- **Imitar el montaje rápido:** de cada clip generado de 5 segundos se sacan 2 o 3 planos cortos en Remotion. Un momento de 15 segundos necesita unos 3 a 5 clips generados.

## Costes en Higgsfield (consultados el 27-11-2026, clip de 5 s, 16:9, sin audio)

| Modelo | Resolución | Créditos |
|---|---|---|
| MAGI-2 | 1080p | 12,5 |
| Seedance 2.5 (borrador) | 480p | 15 (después hay que pagar la versión final) |
| Seedance 2.5 | 720p | 35 |
| Cinema Studio 3.0 | 1080p | 65 |
| Seedance 2.5 | 1080p | 80 |

## Modelo elegido: MAGI-2 (decidido el 27-11-2026)

Se probó el mismo fotograma con MAGI-2 (1080p, 12,5 créditos) y con Seedance 2.5 (720p, 35 créditos). Vicente no vio diferencias importantes y eligió **MAGI-2 para todos los clips**: cuesta casi un tercio y da más resolución, así que permite meter más metraje realista por vídeo.

### Flujo de cada clip
1. **Fotograma inicial realista** con Nano Banana 2 (16:9, 2k, unos 1,5 créditos). Así se controla cómo se ve el Pokémon antes de animarlo.
2. **Animación con MAGI-2** usando ese fotograma como `start_image`: 5 s, 16:9, `generate_audio: false`, 12,5 créditos.
3. **Montaje en Remotion:** de cada clip se sacan planos cortos de 0,5 a 3 s, como en la referencia.

Coste aproximado de los momentos realistas de un vídeo (4-6 clips): **unos 55-85 créditos**.

### Plantilla de prompt del fotograma realista
```
Photorealistic nature documentary still, {POKÉMON} as a real living creature in {HÁBITAT} at {LUZ}.
Realistic {textura de piel, escamas, pelo o caparazón} with fine detail{, water droplets / dust...}.
{Tipo de plano: macro / low-angle close / wide}, shallow depth of field, soft bokeh background.
{Luz y dirección}, creating rim light and a {long/short} shadow on the ground.
{Interacción física: footprints, splashes, sand, bubbles...}.
Shot on a cinema camera, {85mm macro / 35mm} lens, National Geographic style, ultra detailed, no text.
```

### Plantilla de prompt de la animación
```
Nature documentary shot. {Acción concreta y física del Pokémon}. {Detalles de movimiento secundario}.
{Luz y ambiente}. {Movimiento de cámara: slow dolly / orbit / static macro}, shallow depth of field,
realistic natural motion.
```

### Prueba de referencia
- Fotograma: `4bbabd0d-c598-4b72-a197-10ecc69469c1`
- Clip MAGI-2: `44b879c0-ccc8-4d0f-b962-fd004744c614`
