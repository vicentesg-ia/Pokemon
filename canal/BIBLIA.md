# Biblia del canal

Documento base que leen todas las fases del proceso (idea, guion, imágenes, vídeo, montaje y revisión).
Se va completando a medida que tomamos decisiones.

---

## 1. Canales e idiomas

- **Dos canales**: uno en **español** y otro en **inglés**.
- Se publican **los mismos vídeos** en ambos, con una **voz distinta** para cada idioma (ElevenLabs).
- El guion en inglés se **adapta**, no se traduce literalmente: los nombres de Pokémon, movimientos, ataques, objetos y lugares deben usar la **terminología oficial de cada idioma** (p. ej. *Impactrueno* ↔ *Thunderbolt*).
- Se produce una sola vez y se renderiza dos veces: el idioma es un parámetro del montaje. Las imágenes y los clips son compartidos; cambian la voz, los textos en pantalla, el título y la miniatura.

## 2. Formato

- **Un vídeo por Pokémon**. Cada evolución tiene su propio vídeo (Bulbasaur, Ivysaur y Venusaur son tres vídeos).
- Orden: en principio el de la **Pokédex nacional**, aunque puede variar.
- **Duración: entre 5 y 15 minutos o más** (es orientativo). Unos 5 minutos para los Pokémon con poco contenido y 15 o más para los que tienen mucho.
- **Solo vídeos largos** por ahora. Los Shorts se valorarán más adelante.

## 3. Público y tono

- Apto para todos los públicos, pero **pensado sobre todo para adultos**: fans de toda la vida y coleccionistas.
- No debe sonar infantil.

## 4. Contenido de cada vídeo

Quién es el Pokémon, sus características principales, sus curiosidades y, sobre todo, **por qué es conocido y querido en el fandom**.
Los últimos minutos se dedican a sus **cartas más famosas y más caras** del mercado.

### Estructura base (flexible)

| # | Bloque | Contenido | Peso orientativo |
|---|---|---|---|
| 1 | Gancho (0:00–0:30) | Un dato potente o una pregunta que enganche | 5% |
| 2 | Presentación | Nº de Pokédex, tipo, generación, primera aparición | 10% |
| 3 | Diseño y origen | En qué se inspira, quién lo diseñó, curiosidades del nombre | 15% |
| 4 | Juegos, anime y películas | Momentos clave, su papel en la saga | 25% |
| 5 | Por qué el fandom lo adora | Memes, momentos icónicos, competitivo, popularidad | 20% |
| 6 | Las cartas | Cartas más icónicas y más caras, precios actuales | 20% |
| 7 | Cierre | Conclusión + adelanto del siguiente Pokémon + llamada a suscribirse | 5% |

**Regla:** los pesos son orientativos. En cada Pokémon hay que valorar qué bloque tiene más interés y repartir el tiempo según eso. Un Pokémon muy popular puede dedicar mucho más a "por qué el fandom lo adora". Otro con poca historia puede saltarse o reducir bloques.

## 5. Estilo visual

Se mezclan dos estilos:

1. **Ilustraciones 2D estilo crayón**: son la base de la narración. Unas son estáticas y otras tienen movimientos sutiles.
   - **No hay plantillas fijas.** Cada Pokémon tiene escenas propias según su historia y su hábitat: un bosque si vive en el bosque, el mar si es acuático, etc.
   - **Estilo:** crayón o pastel de ilustrador, con textura pero dibujo cuidado (opción B), o mezcla de Pokémon cuidado con fondo más suelto (opción C). Nunca un dibujo infantil. **Elegido: estilo C** (ver `canal/ESTILO_VISUAL.md`: referencias, plantilla de prompt y estrategia de ahorro).
   - **Requisitos de calidad en todas las imágenes:**
     - **Sombras coherentes** del Pokémon y de los objetos, según la fuente de luz.
     - **Huellas y rastros** cuando el Pokémon camina o pisa: barro, tierra, nieve, arena…
     - **La iluminación cambia según la escena:** sol alto, sol bajo, atardecer, nublado, luz filtrada por los árboles… La dirección y la longitud de las sombras tienen que coincidir con esa luz.
     - **Colores vivos y saturados** que llamen la atención.
   - **Sin personas:** las ilustraciones y los clips se centran siempre en los Pokémon. No salen niños, jugadores ni personas reconocibles. Si hace falta evocar algo humano (un juego, una foto, un concurso), se hace con objetos o con el propio Pokémon.
   - **Modelo de imagen:** Nano Banana 2 (Higgsfield). GPT Image bloquea a los personajes de Pokémon por propiedad intelectual.
2. **Clips realistas generados con Higgsfield**: Pokémon con aspecto realista en momentos clave (evoluciones, planos espectaculares). *(Referencia visual pendiente: capturas o descripción.)*

**Uso de los clips realistas:** no tienen una posición fija. Se colocan donde aporten más.
Si es lo que más llama la atención de ese Pokémon, se abre el vídeo con uno y se pueden añadir más a lo largo del vídeo.

## 6. Herramientas

| Herramienta | Uso |
|---|---|
| Higgsfield | Imágenes 2D y clips realistas |
| ElevenLabs | Voz en off (ES y EN), efectos de sonido y música |
| Remotion | Montaje: composición, textos, subtítulos, transiciones, gráficos y render final. También los **movimientos de cámara** (zoom, recorridos, parallax) y las **partículas**, para sacar varios planos de cada imagen sin gastar créditos |

## 7. Investigación y datos

- **Fuentes principales:** Bulbapedia (EN) y WikiDex (ES). Se contrastan con la web oficial de Pokémon.
- **Precios de cartas:**
  - Canal inglés: **dólares**, de **TCGplayer**.
  - Canal español: **euros**, de **Cardmarket**.
  - Siempre se incluyen las **cartas más caras** y las **ventas récord en subastas** (PSA 10, cartas graduadas), porque es lo que más llama la atención.
  - Los precios se indican con su fecha de consulta: son datos que cambian.
  - **Canal ES, precios en dólares:** cuando la fuente da el precio en USD (ventas récord, PriceCharting, TCGplayer), se **convierte a euros** con el tipo de cambio del día del guion. Se redondea y se presenta como aproximado ("809.943 $, unos 700.000 €"). En las ventas récord se puede dar la cifra original en dólares y la conversión.
  - **Fuente de ventas reales:** 130point.com (reúne eBay, Goldin, Fanatics, Heritage…).
  - **Doblaje:** en el canal ES no se citan títulos de episodios del anime si no se pueden confirmar en el doblaje latino.
- **Flujo de aprobación:**
  - **Primeros vídeos (opción A):** se presenta una **ficha del Pokémon** (datos, curiosidades, ángulo del vídeo y peso de cada bloque) y Vicente la aprueba antes de pasar al guion.
  - **Cuando el flujo esté afinado (opción B):** se pasa directamente de la investigación al guion, y solo se revisa el guion.
  - ⏰ **Recordatorio:** proponer el paso de A a B cuando los vídeos salgan con pocas correcciones de forma constante.

## 8. Guion y narrador

- **Narrador cercano y con personalidad.** Habla directamente al espectador ("¿Sabías que…?", "Seguro que tú también…"), con algún comentario u opinión propia. No es un personaje con nombre propio.
- **Humor:** toques puntuales, sin forzarlo. **Calibrado con #001:** el humor es sutil, con ironía suave y complicidad de fan ("si alguna vez sufriste contra Brock con un Charmander…"). **Nada de chistes de meme ni de jerga** ("Un ídolo", "Goals"): rompen el tono documental del canal. Ante la duda, mejor una frase con encanto que una broma. El tono de fondo es el de un fan adulto que sabe mucho y lo cuenta con ganas.
- **Sin frases fijas:** no hay saludo ni despedida repetidos. Cada vídeo empieza directamente con su gancho y termina con un cierre propio.
- **Sin intro ni pantalla final fijas:** no hay cabecera con logo ni end screen predefinida. El adelanto del siguiente Pokémon y la llamada a suscribirse van dentro de la narración del cierre.

## 9. Voces (ElevenLabs)

- **Español: latino neutro**, porque es la audiencia más grande. Los términos de los juegos son iguales en todo el español. En lo que venga del anime se usa el doblaje latino.
- **Inglés: acento americano.**
- **Las dos voces son masculinas y maduras** (35-45 años): cálidas, como un fan veterano.
- **No es la misma persona** en los dos idiomas. Se elige la mejor voz para cada uno.
- Modelo: `eleven_v4`.
- **Voz elegida ES:** Jose – Narrativo y Natural (`voice_id: C12mZePhNoo0RoTXhSFV`)
- **Voz elegida EN:** Christian – Warm Documentary Narrator (`voice_id: KMLpM4tgKxYUlv81Ue0p`). Se usa en su registro natural, sin etiquetas de energía añadidas.

## 10. Música y efectos de sonido

- **Música de fondo ambiental** por defecto: acompaña sin distraer.
- **Música épica en las escenas top**: clips realistas, evoluciones, momentos espectaculares y récords de cartas.
- **Guiño a Pokémon:** composiciones **originales** que recuerden al ambiente de aventura (orquesta de fantasía, toques chiptune). **Nunca música oficial**: Content ID la detecta.
- **Efectos de sonido: sí.** Pasos, viento, agua, hojas, ambiente y transiciones ("whoosh"). Sirven para dar vida a las ilustraciones animadas.
- La música va por debajo de la voz: la voz siempre es lo que más se oye.

## 11. Montaje (Remotion)

- **Subtítulos:** no van grabados en el vídeo. Se sube un archivo de subtítulos aparte a YouTube (ES y EN), que el espectador activa si quiere y que además ayuda al SEO.
- **Rótulos clave en pantalla:** solo los datos importantes (nº de Pokédex, tipo, cifras, precios, fechas). La ilustración debe quedar limpia. **Estilo elegido: crayón (opción A)** para todos los rótulos, cifras y precios incluidos:
  - trozos de papel con el borde irregular y una ligera inclinación;
  - letra de cera (Cabin Sketch para títulos, Gochi Hand para etiquetas) con textura de crayón;
  - colores de crayón: tinta verde oscuro, rojo para destacar y el color del tipo del Pokémon en las etiquetas;
  - animación de entrada como si se dibujara a mano.
  - Prototipo de referencia: https://claude.ai/artifact/B87iwT4WryZBAqD4sy9wGE
- **Transiciones:** cortes directos en los tramos rápidos (clips realistas, montaje de ritmo) y transiciones suaves (fundidos, barridos lentos) entre bloques de la narración. Lo decide el montaje según la escena.
- **Movimiento:** zooms, recorridos de cámara, parallax y partículas sobre las ilustraciones (ver `ESTILO_VISUAL.md`).

### Sección de cartas
- La carta aparece en grande con un pequeño giro 3D y brillo holográfico, el precio sube como un contador y lleva una etiqueta del tipo "PSA 10 · Récord en subasta". Se irá puliendo.
- **Las cartas se muestran siempre con fotos reales sacadas de internet. Nunca se generan con IA.**
  - Fuentes de imagen: fichas de TCGplayer, Cardmarket, PriceCharting y anuncios de casas de subastas (PSA, Heritage, Goldin) para las ventas récord.
  - Se muestran como parte del análisis: la imagen siempre va con su precio, la fuente y el comentario del narrador.
  - Se guarda de dónde sale cada imagen (URL y fecha) en la carpeta del vídeo.

## 12. Miniaturas y títulos

### Miniaturas
- Para cada vídeo se proponen **3 opciones** y Vicente elige:
  - **2 realistas**, a partir de un fotograma tipo clip de Higgsfield con el Pokémon realista;
  - **1 mixta**, con Pokémon realista y elementos o texto en crayón, o mitad crayón y mitad realista.
- **Texto:** de 2 a 4 palabras muy grandes que provoquen curiosidad ("¿POR QUÉ ES TAN CARO?", "EL ORIGEN SECRETO").
- Cada miniatura se hace **en los dos idiomas**: misma imagen, texto traducido o adaptado.

### Títulos
- **Gancho variable:** cada título busca la curiosidad más potente de ese Pokémon ("El Pokémon que casi fue la mascota de Pokémon").
- Se proponen **3 opciones** por vídeo y Vicente elige. Se adaptan a cada idioma, no se traducen palabra por palabra.

## 13. Nombre de los canales

- **Español:** Crónicas del Entrenador · identificador propuesto `@CronicasDelEntrenador`
- **Inglés:** Trainer Chronicles · identificador propuesto `@TrainerChronicles`
- Cada vídeo es la "crónica" de un Pokémon. Se puede usar como serie: "Crónica #001: Bulbasaur".
- **Logo:** el nombre escrito a mano en crayón sobre la tapa de un cuaderno gastado. Une la épica del nombre con el estilo visual. *(Diseño pendiente.)*
- **Nunca** poner "Poké" delante ni imitar la tipografía o los colores del logo oficial (existió una serie oficial llamada "Pokémon Chronicles").
- La disponibilidad está comprobada a grandes rasgos; se confirmará al crear los canales.

## 14. Riesgos a vigilar

- **Política de contenido "no auténtico" de YouTube**: hay que evitar los vídeos repetitivos o de poco valor. El valor lo aportan un buen guion, un estilo propio y una revisión de calidad.
- **Propiedad intelectual de Pokémon**: no usar material oficial (arte, capturas o fragmentos del anime) sin criterio. Hay que cuidar que los diseños generados no sean copias de los oficiales.

---

## Pendiente de definir

- [x] Fuentes de información y verificación de datos
- [x] Fuente de precios de cartas
- [x] Estilo del guion y del narrador
- [x] Estilo de las ilustraciones 2D (estilo C)
- [x] Estilo realista de Higgsfield (MAGI-2)
- [x] Voces (ES y EN)
- [x] Música y efectos (criterios)
- [x] Estilo de montaje en Remotion (rótulos en crayón, subtítulos aparte, transiciones)
- [x] Miniaturas y títulos
- [x] Nombres de los canales
