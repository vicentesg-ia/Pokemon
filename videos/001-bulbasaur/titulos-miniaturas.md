# Títulos y miniaturas · #001 Bulbasaur

> **Estado: miniatura elegida: M4** · título pendiente · 2026-11-27

## Títulos (gancho variable)

| # | ES | EN |
|---|---|---|
| T1 | Una foto de este Pokémon se vendió por 809.943 dólares | Someone Paid $809,943 for a Photo of This Pokémon |
| T2 | Bulbasaur: el Pokémon nº 1 que nadie sabe si es planta o animal | Pokémon #1 Is Still a Mystery After 30 Years |
| T3 | El Pokémon que se negó a evolucionar… y su carta de 800.000$ | The Pokémon That Refused to Evolve… and Its $800,000 Card |

## Miniaturas

| # | Tipo | Texto ES | Texto EN | Archivos | Imagen base (Higgsfield job) |
|---|---|---|---|---|---|
| M1 | Realista | POR UNA FOTO · 809.943$ | FOR A PHOTO · $809,943 | `miniaturas/r1_es.jpg`, `r1_en.jpg` | `22ca8a92-76f9-4576-95bd-b0c02edcfe19` |
| M2 | Realista | ¿PLANTA O ANIMAL? | PLANT OR ANIMAL? | `miniaturas/r2_es.jpg`, `r2_en.jpg` | `9c835680-3884-478d-a3b2-02b5b5ee8df8` |
| M3 | Mixta (crayón + realista) | LA FOTO DE 800.000$ | A $800K PHOTO | `miniaturas/m3_es.jpg`, `m3_en.jpg` | `0b3204f8-f573-4594-81b6-217a4027b983` |

| ⭐⭐ **M4** | Realista: **carta real grande a la izquierda** con brillo, **Bulbasaur realista a la derecha**, precio con **flecha** que señala la carta (inspirada en la referencia de Vicente) | 700.000€ | $809,943 | `miniaturas/m4_es.jpg`, `m4_en.jpg` | Fondo: `22ca8a92…` + carta real · `herramientas/miniatura-carta.js` |
| M3-carta | Realista + **foto real de la carta** (pedida por Vicente) | POR ESTA CARTA · 809.943$ | FOR THIS CARD · $809,943 | `miniaturas/m3card_es.jpg`, `m3card_en.jpg` | Fondo: `22ca8a92…` + carta real |

**Foto de la carta:** recortada de la captura de 130point de Vicente (foto de la venta en Goldin, PSA 8, cert. 165286175), guardada en `cartas/snap-bulbasaur-psa8.png`. Tiene poca resolución (200×330 px, ampliada ×2). ⚠️ Si se consigue una foto en alta resolución de Goldin, se vuelve a renderizar con `herramientas/miniatura-carta.js`.

- El texto se añade con `herramientas/miniaturas.js` (Playwright, 1280×720), sin IA, para que sea exacto en los dos idiomas.
- Combinaciones que encajan: T1 + M1 o M3 (la foto de 809.943$) · T2 + M2 (el misterio) · T3 + M1 o M3.
- Coste: 3 imágenes base, unos 4,5 créditos de Higgsfield.
