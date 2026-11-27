---
name: guion
description: Fase 2 de producción del canal Crónicas del Entrenador / Trainer Chronicles. Escribe el guion bilingüe (ES latino neutro + EN americano) de un vídeo a partir de su ficha aprobada, dividido en escenas con indicaciones visuales, rótulos, música y efectos. Úsala cuando la ficha esté aprobada y el usuario pida el guion ("guion del 001", "pasamos al guion", "guiones del 2 al 4").
---

# Fase 2: guion

El resultado es `videos/<NNN>-<nombre>/guion.md`, que **Vicente tiene que aprobar**.
Sirve a la vez de texto para la voz (ElevenLabs) y de plan de escenas para las fases de imágenes, clips y montaje.

## Requisitos previos
- `ficha.md` con `Estado: ✅ aprobada`. Si no lo está, para y pide la aprobación.
- Lee `canal/BIBLIA.md`: §4 estructura, §7 datos y precios, §8 narrador, §10 música, §11 montaje y §12 títulos.
- Lee `canal/ESTILO_VISUAL.md` para saber qué escenas son ilustración, clip realista o carta.

## Reglas de contenido
1. **Solo se afirma lo que está en la ficha.** Los datos marcados ⚠️ se dicen con prudencia ("según algunas fuentes…") o no se dicen. Las decisiones de Vicente en la ficha mandan.
2. **Estructura:** los 7 bloques con el reparto de pesos aprobado en la ficha.
3. **Duración:** unas **150 palabras por minuto** en ES. La versión EN suele quedar un 10-15% más corta, lo cual es normal.
4. **Precios:**
   - EN: dólares, tal como vienen de la fuente.
   - ES: dólares convertidos a euros con el tipo de cambio del día, redondeados y con "unos". En las ventas récord se dicen las dos cifras.
   - Al principio del bloque de cartas va un rótulo con la **fecha de los precios**.
5. **Terminología oficial de cada idioma:** movimientos, lugares, personajes (Ciudad Celeste / Cerulean City, Excavar / Dig). En ES no se citan títulos de episodios del anime si no están confirmados en el doblaje latino.

## Reglas de estilo (narrador, BIBLIA §8)
- Narrador **cercano**: habla al espectador ("¿sabías que…?", "si alguna vez…"). Es un fan adulto que sabe mucho y lo cuenta con ganas.
- **Humor puntual**: 1 o 2 guiños por bloque como mucho, nunca forzados.
- **Sin frases fijas** de saludo ni despedida. Se empieza directamente con el gancho.
- Frases cortas, fáciles de decir en voz alta. Nada de paréntesis ni listas: es texto hablado.
- Los números se escriben como se dicen cuando haya duda ("809.943 dólares", "unos 700.000 euros").
- **ES latino neutro**: nada de "vosotros" ni de expresiones de España ("guay", "flipar", "mola"). Se usa "ustedes" o se habla de tú al espectador.
- **EN americano**: el guion se **adapta**, no se traduce. Los chistes y las expresiones se reescriben para que suenen naturales.
- **El cierre** incluye el adelanto del siguiente Pokémon de `videos/PLAN.md` y una llamada a suscribirse, dentro de la narración.

## Formato de `guion.md`

Cabecera:
```markdown
# Guion · #<NNN> <Nombre>
> Estado: pendiente de aprobación · Escrito el <fecha> · Tipo de cambio usado: 1 € ≈ <x> $ (<fuente/fecha>)
> Duración estimada: ES ~<min> (<palabras> palabras) · EN ~<min>
```

Cada bloque lleva un título con el tiempo aproximado, y dentro van las **escenas numeradas** (`1.1`, `1.2`…). Cada escena dura entre 5 y 25 segundos de narración y tiene este formato:

```markdown
### 1.1 · <nombre corto de la escena>
- **Visual:** `ILU` | `ILU-FONDO` | `CLIP` | `CARTA` | `GRAFICO` — descripción de lo que se ve
- **Cámara:** movimiento en Remotion (zoom lento, recorrido, parallax, cortes rápidos…)
- **Rótulo:** ES "…" / EN "…" (solo si hay un dato clave)
- **Sonido:** música (ambiental / épica / tensión) y efectos (pasos, viento, whoosh…)

**ES:** texto que dice Jose.

**EN:** texto que dice Christian.
```

Tipos de visual:
- `ILU`: ilustración crayón nueva con el Pokémon (fase 4).
- `ILU-FONDO`: fondo reutilizable de la biblioteca, sin Pokémon o con un elemento sencillo.
- `CLIP`: clip realista de MAGI-2 (fase 5). Como mucho 1-2 momentos por vídeo.
- `CARTA`: foto real de la carta, con la animación de cartas de Remotion. **Nunca se genera con IA.**
- `GRAFICO`: rótulo o gráfico animado en Remotion (ficha, comparativa de precios…).

Al final del guion va un **resumen de producción**:
- lista de ilustraciones nuevas, indicando cuáles se pueden reutilizar;
- lista de clips realistas;
- lista de cartas, con la URL de la imagen real (de la ficha);
- palabras y duración por idioma.

## Al terminar
1. Guarda el guion, actualiza `estado.md` y haz commit y push.
2. Presenta en el chat: la duración, el gancho, un fragmento del inicio (ES y EN) y los puntos en los que necesitas su opinión. Incluye el enlace al archivo.
3. **Para y espera la aprobación.** Cuando la dé, marca `Estado: ✅ aprobado` y ofrece pasar a títulos y miniaturas.
