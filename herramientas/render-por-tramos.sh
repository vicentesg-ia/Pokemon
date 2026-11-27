#!/usr/bin/env bash
# Render robusto de una composición de Remotion por tramos.
# Uso (desde la raíz del repo): herramientas/render-por-tramos.sh V001-ES videos/001-bulbasaur/render/001-bulbasaur-ES.mp4
#
# - Empaqueta el proyecto una vez.
# - Renderiza el vídeo (sin audio) en tramos de 2000 fotogramas, con 2 reintentos por tramo
#   y saltándose los tramos ya hechos (si se corta, se relanza y continúa).
# - Renderiza el audio completo aparte (rápido) y lo une con los tramos sin recomprimir.
set -euo pipefail
COMP="$1"
SALIDA="$(realpath -m "$2")"
TRAMO=2000
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
TMP="${SALIDA%.mp4}.tramos"
mkdir -p "$TMP" "$(dirname "$SALIDA")"
cd "$RAIZ/remotion"

echo "== Empaquetando"
npx remotion bundle src/index.ts --out-dir "$TMP/bundle" > "$TMP/bundle.log" 2>&1

TOTAL=$(npx remotion compositions "$TMP/bundle" 2>/dev/null | awk -v c="$COMP" '$1==c {print $4}')
echo "== $COMP: $TOTAL fotogramas"
: > "$TMP/lista.txt"
for ((ini=0; ini<TOTAL; ini+=TRAMO)); do
  fin=$(( ini + TRAMO - 1 < TOTAL - 1 ? ini + TRAMO - 1 : TOTAL - 1 ))
  f="$TMP/tramo-$(printf %05d $ini).mp4"
  echo "file '$f'" >> "$TMP/lista.txt"
  if [[ -s "$f" ]]; then echo "   tramo $ini-$fin ya hecho"; continue; fi
  for intento in 1 2 3; do
    echo "   tramo $ini-$fin (intento $intento)"
    if npx remotion render "$TMP/bundle" "$COMP" "$f.part.mp4" --frames=$ini-$fin --muted \
         --concurrency=4 --crf=20 --timeout=120000 > "$TMP/tramo-$ini.log" 2>&1; then
      mv "$f.part.mp4" "$f"; break
    fi
    tail -5 "$TMP/tramo-$ini.log"
    [[ $intento == 3 ]] && { echo "ERROR: el tramo $ini-$fin ha fallado 3 veces"; exit 1; }
  done
done

echo "== Audio"
npx remotion render "$TMP/bundle" "$COMP" "$TMP/audio.aac" --codec=aac > "$TMP/audio.log" 2>&1

echo "== Uniendo"
ffmpeg -v error -y -f concat -safe 0 -i "$TMP/lista.txt" -i "$TMP/audio.aac" -map 0:v -map 1:a -c copy -movflags +faststart "$SALIDA"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$SALIDA"
echo "== Listo: $SALIDA"
