import React from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

// Estilo del canal: rótulos en crayón (BIBLIA §11).
// Las fuentes se cargan en local (public/fuentes) porque el navegador de render no puede bajarlas de Google Fonts.
export const FUENTE_CRAYON = 'CabinSketchLocal';
export const FUENTE_MANO = 'GochiHandLocal';
if (typeof window !== 'undefined' && typeof FontFace !== 'undefined') {
	const h = delayRender('Cargando fuentes', {timeoutInMilliseconds: 180000});
	Promise.all([
		new FontFace(FUENTE_CRAYON, `url(${staticFile('fuentes/CabinSketch-Bold.woff2')}) format('woff2')`, {weight: '700'}).load(),
		new FontFace(FUENTE_MANO, `url(${staticFile('fuentes/GochiHand.woff2')}) format('woff2')`).load(),
	])
		.then((fs) => fs.forEach((f) => (document as any).fonts.add(f)))
		.catch((e) => console.error('Fuentes', e))
		.finally(() => continueRender(h));
}

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
