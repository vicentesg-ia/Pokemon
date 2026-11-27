import React from 'react';
import {continueRender, delayRender} from 'remotion';
import {CABIN_SKETCH_B64, GOCHI_HAND_B64} from './fuentes-b64';

// Estilo del canal: rótulos en crayón (BIBLIA §11).
// El navegador de render no puede bajar las fuentes de Google Fonts: van incrustadas en el código (fuentes-b64.ts).
export const FUENTE_CRAYON = 'CabinSketchLocal';
export const FUENTE_MANO = 'GochiHandLocal';
// Las fuentes se declaran con @font-face y data URI (sin red). <FuentesCrayon/> espera a que estén listas,
// pero con una salida de seguridad de 5 s: nunca bloquea el render (lección de #001).
const CSS_FUENTES = `
@font-face { font-family: '${FUENTE_CRAYON}'; font-weight: 700; font-display: block; src: url(data:font/woff2;base64,${CABIN_SKETCH_B64}) format('woff2'); }
@font-face { font-family: '${FUENTE_MANO}'; font-display: block; src: url(data:font/woff2;base64,${GOCHI_HAND_B64}) format('woff2'); }
`;
export const FuentesCrayon: React.FC = () => {
	const [h] = React.useState(() => delayRender('Fuentes crayón', {timeoutInMilliseconds: 30000}));
	React.useEffect(() => {
		let hecho = false;
		const fin = () => { if (!hecho) { hecho = true; continueRender(h); } };
		const seguridad = setTimeout(fin, 5000);
		Promise.all([
			(document as any).fonts.load(`700 40px '${FUENTE_CRAYON}'`),
			(document as any).fonts.load(`40px '${FUENTE_MANO}'`),
		]).then(fin, fin);
		return () => clearTimeout(seguridad);
	}, [h]);
	return <style>{CSS_FUENTES}</style>;
};

export const C = {
	papel: '#fbf6e6',
	tinta: '#22352a',
	rojo: '#c8442f',
	verde: '#3b8a3e',
	oro: '#f2b51c',
};

// Filtros SVG que dan el borde irregular (rough) y la textura de cera (wax).
export const FiltrosCrayon: React.FC = () => (
	<svg width={0} height={0} style={{position: 'absolute'}}>
		<filter id="rough">
			<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={4} />
			<feDisplacementMap in="SourceGraphic" scale={6} />
		</filter>
		<filter id="wax">
			<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} result="n" />
			<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.45" result="holes" />
			<feComposite in="SourceGraphic" in2="holes" operator="in" result="tex" />
			<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={1} seed={2} result="w" />
			<feDisplacementMap in="tex" in2="w" scale={2.5} />
		</filter>
		<filter id="papel">
			<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} seed={11} />
			<feColorMatrix type="matrix" values="0 0 0 0 0.98  0 0 0 0 0.95  0 0 0 0 0.88  0 0 0 0.12 0" />
		</filter>
	</svg>
);

export const fmtPrecio = (n: number, lang: 'es' | 'en', monedaEs: string = '€'): string => {
	const r = Math.round(n);
	if (lang === 'en') return '$' + r.toLocaleString('en-US');
	return r.toLocaleString('de-DE') + monedaEs; // 809.943$ / 700.000€: símbolo pegado (BIBLIA §7)
};
