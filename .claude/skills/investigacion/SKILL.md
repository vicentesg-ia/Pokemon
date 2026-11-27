---
name: investigacion
description: Fase 1 de producción del canal Crónicas del Entrenador / Trainer Chronicles. Investiga un Pokémon (datos, diseño y origen, juegos, anime, fandom, cartas y precios) y redacta su ficha para aprobación. Úsala cuando el usuario pida empezar un vídeo, preparar la ficha o investigar un Pokémon por número o nombre (p. ej. "hacemos el 002", "/investigacion 25", "fichas del 2 al 4").
---

# Fase 1: investigación y ficha del Pokémon

El resultado es `videos/<NNN>-<nombre>/ficha.md`, que **Vicente tiene que aprobar** antes de pasar al guion.
La ficha es la única fuente de datos del guion: todo lo que no esté en ella no se puede afirmar en el vídeo.

## Antes de empezar

1. Lee `canal/BIBLIA.md`, sobre todo las secciones 4 (contenido y estructura) y 7 (investigación y datos).
2. Busca el Pokémon en `videos/pokedex.csv`: número, nombres ES/EN, tipos, generación, categoría y de quién evoluciona.
3. Crea la carpeta `videos/<NNN>-<nombre-en-minúsculas>/` con el número en 3 dígitos (4 a partir del 1000), por ejemplo `001-bulbasaur`.
4. Crea o actualiza `estado.md` en esa carpeta (plantilla al final) y cambia el estado en `videos/PLAN.md` a 🔎.

Si piden varios Pokémon ("fichas del 2 al 4"), haz cada uno completo y por orden, y preséntalos juntos para aprobarlos de una vez.

## Fuentes

| Qué | Fuente principal | Contraste |
|---|---|---|
| Datos, juegos, diseño, curiosidades | Bulbapedia (`bulbapedia.bulbagarden.net/wiki/<Name>_(Pokémon)`) | WikiDex (`www.wikidex.net/wiki/<Nombre>`) y `www.pokemon.com` |
| Terminología en español (movimientos, objetos, lugares) | WikiDex | — |
| Anime y doblaje latino | WikiDex (secciones de anime) | Bulbapedia |
| Cartas: listado e imágenes | `api.pokemontcg.io` (datos e imágenes oficiales de las cartas) | Bulbapedia (`<Name>_(TCG)`) |
| Precios en USD (canal EN) | TCGplayer y PriceCharting | — |
| Precios en EUR (canal ES) | Cardmarket | — |
| Ventas récord y cartas graduadas | PSA (`www.psacard.com`), Heritage (`www.ha.com`), Goldin (`goldin.co`), PriceCharting | Noticias fiables si la venta fue mediática |

### Cómo acceder desde el entorno cloud (aprendido con #001)
Bulbapedia, WikiDex, Cardmarket y PSA **bloquean el acceso automático** (403 o comprobación anti-bots), aunque estén permitidos en la red. Usa esto:
- **Datos de juego** (altura, peso, categoría, estadísticas, evoluciones, entradas de la Pokédex en español): CSV de PokeAPI en `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/` (`pokemon`, `pokemon_species_names` con idioma 7=es y 9=en, `pokemon_species_flavor_text`, `pokemon_evolution`, `pokemon_stats`).
- **Diseño, anime, trivia y fandom:** la herramienta `WebSearch`, que resume Bulbapedia, Wikipedia, Serebii, etc. y devuelve URLs citables. Lanza varias búsquedas en paralelo, una por tema.
- **Cartas e imágenes oficiales:** `https://api.pokemontcg.io/v2/cards?q=name:<nombre>&pageSize=100`. Incluye la imagen (`images.large`) y precios de TCGplayer (USD, por variante) y Cardmarket (EUR, `trendPrice`, `reverseHoloTrend`…). Solo tiene cartas en inglés.
- **Precios graduados y cartas japonesas:** PriceCharting.
  - Búsqueda: `https://www.pricecharting.com/search-products?q=<nombre>&type=prices`. Las columnas son *Ungraded*, *Grade 7* y *Grade 8*, **no** PSA 10.
  - Ficha de cada carta (`/game/<set>/<carta>`): la tabla `full-prices` trae Ungraded, Grade 9, PSA 10, etc.
  - Los valores de *BGS 10 Black* son estimaciones: no usarlos.
- **Ventas récord:** `WebSearch` en modo `extended`. Una venta solo se da por buena si aparece en PSA Auction Prices, en una casa de subastas o en dos fuentes independientes.

### Reglas de verificación
- **Cada dato lleva su fuente** (URL) en la ficha. Si un dato no se puede verificar, no entra, o entra marcado como `⚠️ sin confirmar` para que Vicente decida.
- Los datos curiosos y de diseño (inspiración, diseñador, origen del nombre) deben aparecer en **dos fuentes**, o en una fuente oficial o una entrevista citada.
- Distingue **hechos** de **teorías de fans**. Las teorías pueden usarse, pero presentadas como tales.
- **Precios:** apunta siempre la fecha de consulta, la moneda, el estado de la carta (raw, PSA 9, PSA 10…) y si es precio de mercado o venta concreta.
- Si una web falla o bloquea el acceso, dilo en la ficha. No rellenes con memoria.

## Qué investigar

1. **Lo básico:** número, tipos, categoría ("Pokémon Semilla"), altura, peso, generación y juego de debut, línea evolutiva (cómo y a qué nivel evoluciona), región o hábitat.
2. **Diseño y origen:** en qué animal, planta, objeto o mito se inspira, quién lo diseñó (si se sabe), origen del nombre en japonés, inglés y español, y cambios de diseño a lo largo del tiempo.
3. **Juegos:** papel en la saga (inicial, legendario, rareza…), momentos y mecánicas destacadas, su papel en el competitivo (VGC o Smogon, de forma resumida), formas especiales (Mega, Gigamax, regionales, variocolor).
4. **Anime y películas:** episodios o momentos icónicos y personajes con los que se asocia. Usa los nombres del **doblaje latino** para el canal ES.
5. **Fandom:** por qué es querido o famoso, memes, popularidad en encuestas oficiales (p. ej. Pokémon of the Year), merchandising icónico y controversias.
6. **Cartas** (para el bloque final del vídeo):
   - las **3-5 cartas más icónicas** (primera aparición, ilustraciones famosas, promos);
   - las **3-5 más caras** con precio actual en **USD (TCGplayer/PriceCharting)** y en **EUR (Cardmarket)**;
   - las **ventas récord** en subasta: carta, grado, precio, casa de subastas y fecha;
   - para cada carta, una **URL de imagen real** (pokemontcg.io, TCGplayer o la casa de subastas). **Nunca se generan cartas con IA.**

## Propuesta editorial

Con los datos, propón:
- **Ángulo del vídeo:** la idea central que hace interesante a este Pokémon, en una frase.
- **Gancho inicial:** 2-3 opciones para los primeros 30 segundos.
- **Reparto de bloques:** ajusta los pesos de la estructura base (BIBLIA §4) a este Pokémon y justifícalo en una línea.
- **Duración estimada:** entre 5 y 15 minutos o más, según cuánto dé de sí.
- **Momentos para clips realistas:** 1-2 candidatos (un clip de 5-10 s y otro de 10-15 s).
- **Hábitats y escenas** para las ilustraciones: lista corta, para reutilizar fondos de la biblioteca.

## Plantilla de `ficha.md`

```markdown
# Ficha · #<NNN> <Nombre ES> (<Nombre EN>)

> Estado: pendiente de aprobación · Investigado el <AAAA-MM-DD>

## Ángulo del vídeo
<una frase>

## Ganchos propuestos
1. …
2. …

## Datos básicos
| Campo | Valor | Fuente |
|---|---|---|

## Diseño y origen
- <dato> — [fuente](url)

## Juegos
## Anime y películas
## Por qué lo adora el fandom
## Cartas
### Más icónicas
| Carta | Set / año | Por qué es icónica | Imagen | Fuente |
### Más caras (precios a <fecha>)
| Carta | Estado | USD (TCGplayer/PriceCharting) | EUR (Cardmarket) | Imagen | Fuentes |
### Ventas récord
| Carta | Grado | Precio | Casa de subastas | Fecha | Fuente |

## Estructura propuesta
| Bloque | Peso | Por qué |
Duración estimada: <min>

## Momentos para clips realistas
## Escenas e hábitats para ilustraciones
## Dudas y datos sin confirmar
## Fuentes consultadas
```

## Al terminar

1. Guarda `ficha.md`, actualiza `estado.md` ("Ficha lista, pendiente de aprobación") y haz commit y push.
2. Presenta a Vicente **un resumen corto en el chat**: ángulo, ganchos, 3-4 datos estrella, cartas top con precio, duración y dudas. Incluye el enlace a la ficha. No pegues la ficha entera.
3. **Para y espera la aprobación.** Aplica sus correcciones a la ficha. Cuando la apruebe, márcala como `Estado: aprobada` en la cabecera y en `estado.md`, y ofrece pasar al guion.

## Plantilla de `estado.md`

```markdown
# Estado · #<NNN> <Nombre>

| Fase | Estado | Fecha | Notas |
|---|---|---|---|
| 1. Ficha | ⏳ / ✅ | | |
| 2. Guion | | | |
| 3. Títulos y miniaturas | | | |
| 4. Ilustraciones | | | |
| 5. Clips realistas | | | |
| 6. Audio | | | |
| 7. Montaje | | | |
| 8. Revisión | | | |
| 9. Publicado | | | |

## Créditos gastados
| Fase | Higgsfield | ElevenLabs |

## Notas
```
