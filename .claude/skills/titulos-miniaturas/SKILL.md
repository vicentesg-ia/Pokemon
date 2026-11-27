---
name: titulos-miniaturas
description: Fase 3 de producción del canal Crónicas del Entrenador / Trainer Chronicles. Propone 3 títulos con gancho variable (ES y EN) y 3 miniaturas (2 realistas y 1 mixta crayón + realista) con texto exacto en los dos idiomas, para que Vicente elija. Úsala cuando el guion esté aprobado y el usuario pida títulos o miniaturas.
---

# Fase 3: títulos y miniaturas

Requisito: `guion.md` aprobado. Lee BIBLIA §12 y `canal/ESTILO_VISUAL.md`.

## Títulos
- **3 opciones** con gancho variable, cada una en ES y EN. Se adaptan a cada idioma, no se traducen.
- Ganchos que funcionan: la cifra más llamativa (precio récord), el misterio del Pokémon y la historia emocional.
- Hasta unos 70 caracteres. Sin clickbait falso: todo lo que promete el título tiene que estar en el vídeo.
- **No** usar "Pokémon" como marca del canal, pero sí se puede nombrar al Pokémon y a la franquicia en el título.

## Miniaturas
- **3 opciones:** 2 **realistas** y 1 **mixta** (mitad dibujo en crayón y mitad realista, con texto en crayón).
- Cada miniatura lleva **de 2 a 4 palabras en grande** y se hace en **ES y EN** con la misma imagen.
- Las cartas no aparecen generadas con IA en la miniatura. Si hace falta una carta, se usa una foto real.
- Sin personas: solo Pokémon.

### Composición preferida (decidida en #001)
- Cuando la carta más cara es el gancho: **foto real de la carta grande a la izquierda** (girada, con borde y brillo dorado), **Pokémon realista grande a la derecha** y **el precio con una flecha que señala la carta**. Es `herramientas/miniatura-carta.js`.
- **No hace falta poner el nombre del Pokémon** en la miniatura: va en el título.
- **ES siempre en euros** y con el símbolo pegado ("700.000€"); EN en dólares, "$809,943".

### Proceso
1. **Imágenes base sin texto**, con Nano Banana 2 (16:9, 2k, unos 1,5 créditos cada una).
   - Usa como `image_references` el fotograma realista aprobado (`4bbabd0d-c598-4b72-a197-10ecc69469c1`) y, para la mixta, también la referencia crayón (`541a117f-83ca-49de-8208-989a96fb548d`).
   - Pide **hueco vacío a la izquierda** para el texto y "No text, no letters".
2. **Descarga** las imágenes (cloudfront), redúcelas a 1920×1072 JPG en el scratchpad y **revísalas tú** con Read antes de seguir.
3. **Texto**: edita la tabla `T` de `herramientas/miniaturas.js` (textos ES/EN, estilo `real` o `crayon`) y ejecuta
   `node herramientas/miniaturas.js <carpeta-miniaturas>`. Las imágenes deben estar incrustadas como data URI; la ruta del scratchpad está en el script.
   - Estilo `real`: Anton blanco con contorno negro y la cifra en amarillo.
   - Estilo `crayon`: Cabin Sketch con trazo grueso, verde oscuro y rojo.
4. **Revisa las 6 imágenes** (hoja de contactos) y corrige solapes antes de enseñarlas. Lección de #001: el texto no puede tapar al Pokémon ni el dibujo.
5. Guarda los JPG en `videos/<NNN>/miniaturas/` (no subas los PNG base, que pesan mucho: apunta los job_id) y escribe `titulos-miniaturas.md`.
6. Presenta los títulos en una tabla y **envía las miniaturas como archivos** al chat. Vicente elige. Apunta la elección y marca la fase como ✅.
