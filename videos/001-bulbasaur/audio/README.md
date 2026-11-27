# Audio · #001 Bulbasaur (ElevenLabs)

Lienzo de ElevenLabs: flow `jfG4JUL634oYdf0LvGUj` (los session_id están en `sesiones.json`).

## Voz (eleven_v4, 1 toma por escena)
| Idioma | Voz | Archivos | Duración |
|---|---|---|---|
| ES | Jose (`C12mZePhNoo0RoTXhSFV`) | `es/<escena>.mp3` (29) | 9,4 min |
| EN | Christian (`KMLpM4tgKxYUlv81Ue0p`) | `en/<escena>.mp3` (29) | 9,0 min |

- Los textos que se han enviado a la voz están en `textos.json`. En ES, las cifras van escritas en palabras y "PSA" como "pe ese a".
- La duración de cada escena está en `duraciones.json` (la usa Remotion para sincronizar).

## Música (eleven_music_v2_5)
| Archivo | Uso | Duración |
|---|---|---|
| `musica/ambiental.mp3` | Fondo de la narración (en bucle, volumen bajo) | 3:00 |
| `musica/epica.mp3` | Gancho (1.1–1.2), Rayo Solar (6.1) y récord (6.7) | 1:00 |

⚠️ ElevenLabs marcó "Instrumental: False" aunque el prompt pedía instrumental: comprobar que no tiene voces.

## Efectos (eleven_text_to_sound_v3)
`sfx/`: camara (1.1, 6.6), crayon (rótulos), whoosh (transiciones), impacto (1.2, 6.7), contador (precios), pagina (2.3, 3.5), bosque (ambiente 1.1, 2.4, 4.4), rana (3.3), evolucion-corte (4.5), latigo (4.6, 6.1), redoble (5.1), rayo-solar (6.1).

## Créditos de ElevenLabs
Voz ES ~9.000 + EN ~8.200 + música 1.800 + efectos 200 = **~19.200**.
