import React from 'react';
import {
	AbsoluteFill,
	Img,
	OffthreadVideo,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
	Easing,
	random,
} from 'remotion';
import {C, FUENTE_CRAYON, FUENTE_MANO, fmtPrecio} from './estilo';

export type Lang = 'es' | 'en';

// ---------- Ilustración con movimiento de cámara (Ken Burns) ----------
export const Ilustracion: React.FC<{src: string; mov?: string; particulas?: boolean}> = ({src, mov = 'in', particulas}) => {
	const f = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const t = interpolate(f, [0, durationInFrames], [0, 1], {easing: Easing.inOut(Easing.sin)});
	let s = 1.06;
	let x = 0;
	let y = 0;
	if (mov === 'in') s = 1.04 + 0.12 * t;
	if (mov === 'out') s = 1.18 - 0.12 * t;
	if (mov === 'left') { s = 1.14; x = 3 - 6 * t; }
	if (mov === 'right') { s = 1.14; x = -3 + 6 * t; }
	if (mov === 'up') { s = 1.14; y = 3 - 6 * t; }
	return (
		<AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#000'}}>
			<Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s}) translate(${x}%, ${y}%)`}} />
			{particulas ? <Particulas /> : null}
		</AbsoluteFill>
	);
};

const Particulas: React.FC = () => {
	const f = useCurrentFrame();
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{new Array(40).fill(0).map((_, i) => {
				const x0 = random(`x${i}`) * 1920;
				const y0 = random(`y${i}`) * 1080;
				const v = 0.2 + random(`v${i}`) * 0.6;
				const y = (y0 - f * v + 1080) % 1080;
				const x = x0 + Math.sin((f + i * 20) / 40) * 12;
				const o = 0.25 + 0.5 * Math.abs(Math.sin((f + i * 13) / 30));
				return <div key={i} style={{position: 'absolute', left: x, top: y, width: 5, height: 5, borderRadius: 5, background: '#fff6c8', opacity: o, filter: 'blur(1px)'}} />;
			})}
		</AbsoluteFill>
	);
};

// ---------- Clip realista ----------
export const Clip: React.FC<{src: string; desde?: number}> = ({src, desde = 0}) => {
	const {fps} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<OffthreadVideo src={staticFile(src)} startFrom={Math.round(desde * fps)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		</AbsoluteFill>
	);
};

export const Blanco: React.FC = () => {
	const f = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const o = interpolate(f, [durationInFrames - 12, durationInFrames], [1, 0.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return <AbsoluteFill style={{background: `rgba(255,252,240,${o})`}} />;
};

// ---------- Fondo de papel ----------
export const Papel: React.FC<{children?: React.ReactNode}> = ({children}) => (
	<AbsoluteFill style={{background: `radial-gradient(ellipse at center, #fffaf0 0%, ${C.papel} 60%, #efe4c6 100%)`}}>
		<svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
			<rect width="100%" height="100%" filter="url(#papel)" />
		</svg>
		{children}
	</AbsoluteFill>
);

// ---------- Animación "se dibuja a mano" ----------
const useDibujo = (inicio: number, durFrames = 14) => {
	const f = useCurrentFrame();
	const p = interpolate(f, [inicio, inicio + durFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const pasos = Math.floor(p * 9) / 9; // a trompicones, como un trazo a mano
	return {clipPath: `inset(-20% ${100 - pasos * 100}% -20% -5%)`, visible: f >= inicio};
};

// ---------- Rótulos en crayón ----------
export const Rotulo: React.FC<{tipo: string; lineas: string[]; inicio: number}> = ({tipo, lineas, inicio}) => {
	const {clipPath, visible} = useDibujo(inicio);
	if (!visible) return null;
	const base: React.CSSProperties = {position: 'absolute', background: C.papel, color: C.tinta, filter: 'url(#rough)', boxShadow: '8px 12px 0 rgba(0,0,0,0.28)', clipPath};
	if (tipo === 'ficha') {
		const [num, nombre, tipos, cat] = lineas;
		return (
			<div style={{...base, left: 70, top: 70, padding: '26px 42px 30px', transform: 'rotate(-2.2deg)'}}>
				<div style={{fontFamily: FUENTE_MANO, fontSize: 48, color: C.rojo, lineHeight: 1}}>{num}</div>
				<div style={{fontFamily: FUENTE_CRAYON, fontWeight: 700, fontSize: 108, lineHeight: 1, filter: 'url(#wax)'}}>{nombre}</div>
				<div style={{fontFamily: FUENTE_MANO, fontSize: 44, color: C.verde, marginTop: 10}}>{tipos}</div>
				<div style={{fontFamily: FUENTE_MANO, fontSize: 36, opacity: 0.85}}>{cat}</div>
			</div>
		);
	}
	if (tipo === 'precio') {
		return (
			<div style={{...base, right: 80, top: 80, padding: '20px 40px', transform: 'rotate(2.5deg)', textAlign: 'center'}}>
				<div style={{fontFamily: FUENTE_MANO, fontSize: 40}}>{lineas[0]}</div>
				<div style={{fontFamily: FUENTE_CRAYON, fontWeight: 700, fontSize: 96, color: C.rojo, filter: 'url(#wax)'}}>{lineas[1]}</div>
			</div>
		);
	}
	if (tipo === 'titular') {
		return (
			<div style={{...base, left: '50%', top: 90, translate: '-50% 0', padding: '18px 54px 26px', transform: 'rotate(-1.5deg)', textAlign: 'center'}}>
				{lineas.map((l, i) => (
					<div key={i} style={{fontFamily: i === lineas.length - 1 ? FUENTE_CRAYON : FUENTE_MANO, fontWeight: 700, fontSize: i === lineas.length - 1 ? 104 : 46, color: i === lineas.length - 1 ? C.tinta : C.rojo, lineHeight: 1.05}}>{l}</div>
				))}
			</div>
		);
	}
	// 'dato': tira de papel en la parte baja
	return (
		<div style={{...base, left: 90, bottom: 80, padding: '18px 44px 22px', transform: 'rotate(1deg)', maxWidth: 1300}}>
			<div style={{fontFamily: FUENTE_MANO, fontSize: 44, color: C.rojo, lineHeight: 1.1}}>{lineas[0]}</div>
			{lineas[1] ? <div style={{fontFamily: FUENTE_CRAYON, fontWeight: 700, fontSize: 70, lineHeight: 1.1}}>{lineas[1]}</div> : null}
		</div>
	);
};

// ---------- Contador de precio ----------
const usePrecio = (objetivo: number, inicio: number, dur: number) => {
	const f = useCurrentFrame();
	const p = interpolate(f, [inicio, inicio + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	return objetivo * p;
};

const FondoCartas: React.FC = () => (
	<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, #2c4a33 0%, #142218 55%, #070d09 100%)'}}>
		<AbsoluteFill style={{background: 'radial-gradient(circle at 35% 50%, rgba(242,181,28,0.30), transparent 45%)'}} />
	</AbsoluteFill>
);

const CartaImg: React.FC<{src: string; alto: number; delay: number; brillo?: boolean; inclinacion?: number}> = ({src, alto, delay, brillo, inclinacion = -6}) => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const ent = spring({frame: f - delay, fps, config: {damping: 14, mass: 0.8}});
	const giro = Math.sin((f - delay) / 45) * 9;
	const brilloX = ((f - delay) * 6) % 900 - 300;
	return (
		<div style={{position: 'relative', height: alto, transform: `perspective(1600px) translateY(${(1 - ent) * 400}px) rotate(${inclinacion}deg) rotateY(${giro}deg)`, opacity: ent, borderRadius: 18, boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 90px rgba(242,181,28,0.55)', overflow: 'hidden'}}>
			<Img src={staticFile(src)} style={{height: '100%', display: 'block'}} />
			{brillo ? <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${brilloX / 9}%, rgba(255,255,255,0.45) ${brilloX / 9 + 8}%, rgba(255,120,255,0.25) ${brilloX / 9 + 12}%, transparent ${brilloX / 9 + 20}%)`, mixBlendMode: 'screen'}} /> : null}
		</div>
	);
};

export const EscenaCarta: React.FC<{lang: Lang; cartas: string[]; precio: {es: number; en: number; moneda_es?: string; nota_es?: string; exacto?: boolean}; precioIzq?: {es: string; en: string}; etiqueta: {es: string; en: string}; brillo?: boolean}> = ({lang, cartas, precio, precioIzq, etiqueta, brillo}) => {
	const {durationInFrames} = useVideoConfig();
	const inicioPrecio = Math.round(durationInFrames * 0.55);
	const valor = usePrecio(precio[lang], inicioPrecio, 40);
	const {clipPath, visible} = useDibujo(inicioPrecio - 4);
	const etq = useDibujo(10);
	const dos = cartas.length === 2;
	return (
		<AbsoluteFill>
			<FondoCartas />
			<AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', justifyContent: dos ? 'center' : 'flex-start', paddingLeft: dos ? 0 : 260, gap: 140}}>
				{cartas.map((c, i) => (
					<div key={c} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
						<CartaImg src={c} alto={dos ? 700 : 820} delay={i * 30} brillo={brillo || (dos && i === 1)} inclinacion={dos ? (i === 0 ? -4 : 4) : -6} />
						{dos && i === 0 && precioIzq ? <div style={{fontFamily: FUENTE_CRAYON, fontWeight: 700, fontSize: 64, color: C.papel}}>{precioIzq[lang]}</div> : null}
					</div>
				))}
			</AbsoluteFill>
			{visible ? (
				<div style={{position: 'absolute', right: dos ? 'auto' : 170, left: dos ? '50%' : 'auto', top: dos ? 'auto' : 330, bottom: dos ? 60 : 'auto', translate: dos ? '-50% 0' : '0 0', background: C.papel, padding: '20px 50px 26px', filter: 'url(#rough)', transform: 'rotate(2deg)', clipPath, boxShadow: '10px 14px 0 rgba(0,0,0,0.35)', textAlign: 'center'}}>
					<div style={{fontFamily: FUENTE_CRAYON, fontWeight: 700, fontSize: dos ? 96 : 150, color: C.rojo, lineHeight: 1, filter: 'url(#wax)'}}>{precio.exacto ? '' : '≈ '}{fmtPrecio(valor, lang, precio.moneda_es)}</div>
					{lang === 'es' && precio.nota_es ? <div style={{fontFamily: FUENTE_MANO, fontSize: 52, color: C.tinta}}>{precio.nota_es}</div> : null}
				</div>
			) : null}
			{etq.visible ? (
				<div style={{position: 'absolute', left: 60, top: 50, background: C.papel, padding: '10px 30px 14px', filter: 'url(#rough)', clipPath: etq.clipPath, transform: 'rotate(-1.5deg)', fontFamily: FUENTE_MANO, fontSize: 40, color: C.tinta}}>{etiqueta[lang]}</div>
			) : null}
		</AbsoluteFill>
	);
};

// ---------- Escena del récord (6.7): línea de tiempo de 3 ventas ----------
export const EscenaRecord: React.FC<{lang: Lang; carta: string}> = ({lang, carta}) => {
	const {durationInFrames} = useVideoConfig();
	const ventas = lang === 'es'
		? [{a: '2023 · PSA 9', p: '≈ 70.000€'}, {a: '2025 · PSA 9', p: '≈ 175.000€'}, {a: '2026 · PSA 8', p: '809.943$', n: '≈ 700.000€'}]
		: [{a: '2023 · PSA 9', p: '$80,520'}, {a: '2025 · PSA 9', p: '$200,000'}, {a: '2026 · PSA 8', p: '$809,943'}];
	const marcas = [0.08, 0.33, 0.72].map((x) => Math.round(x * durationInFrames));
	return (
		<AbsoluteFill>
			<FondoCartas />
			<div style={{position: 'absolute', left: 170, top: 120}}>
				<CartaImg src={carta} alto={840} delay={0} inclinacion={-5} />
			</div>
			<div style={{position: 'absolute', left: 820, top: 170, display: 'flex', flexDirection: 'column', gap: 44}}>
				{ventas.map((v, i) => (
					<Venta key={i} inicio={marcas[i]} anio={v.a} precio={v.p} nota={v.n} grande={i === 2} />
				))}
			</div>
		</AbsoluteFill>
	);
};

const Venta: React.FC<{inicio: number; anio: string; precio: string; nota?: string; grande?: boolean}> = ({inicio, anio, precio, nota, grande}) => {
	const {clipPath, visible} = useDibujo(inicio, 12);
	if (!visible) return null;
	return (
		<div style={{background: C.papel, padding: grande ? '22px 50px 28px' : '14px 36px 18px', filter: 'url(#rough)', clipPath, transform: `rotate(${grande ? -2 : 1}deg)`, boxShadow: '10px 14px 0 rgba(0,0,0,0.35)', alignSelf: 'flex-start'}}>
			<div style={{fontFamily: FUENTE_MANO, fontSize: grande ? 48 : 38, color: C.tinta}}>{anio}</div>
			<div style={{fontFamily: FUENTE_CRAYON, fontWeight: 700, fontSize: grande ? 150 : 76, color: grande ? C.rojo : C.tinta, lineHeight: 1, filter: 'url(#wax)'}}>{precio}</div>
			{nota ? <div style={{fontFamily: FUENTE_MANO, fontSize: 50, color: C.tinta}}>{nota}</div> : null}
		</div>
	);
};

// ---------- Gráficos en crayón sobre papel ----------
const Trazo: React.FC<{inicio: number; children: React.ReactNode; style?: React.CSSProperties}> = ({inicio, children, style}) => {
	const {clipPath, visible} = useDibujo(inicio, 16);
	if (!visible) return null;
	return <div style={{clipPath, ...style}}>{children}</div>;
};

export const Grafico: React.FC<{nombre: string; lang: Lang}> = ({nombre, lang}) => {
	const {durationInFrames: d, fps} = useVideoConfig();
	const s = (seg: number) => Math.round(seg * fps);
	const grande: React.CSSProperties = {fontFamily: FUENTE_CRAYON, fontWeight: 700, color: C.tinta, filter: 'url(#wax)', lineHeight: 1};
	const mano: React.CSSProperties = {fontFamily: FUENTE_MANO, color: C.rojo};
	if (nombre === 'pokedex001') {
		return (
			<Papel>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
					<Trazo inicio={s(0.3)} style={{...mano, fontSize: 70}}>{lang === 'es' ? 'Pokédex nacional' : 'National Pokédex'}</Trazo>
					<Trazo inicio={s(1.0)} style={{...grande, fontSize: 420, color: C.verde}}>001</Trazo>
					<Trazo inicio={s(2.2)} style={{...mano, fontSize: 64, color: C.tinta}}>{lang === 'es' ? '30 años · 1996 – 2026' : '30 years · 1996 – 2026'}</Trazo>
				</AbsoluteFill>
			</Papel>
		);
	}
	if (nombre === 'alreves') {
		const pasos = ['Venusaur', 'Ivysaur', 'Bulbasaur'];
		return (
			<Papel>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40}}>
					<Trazo inicio={s(0.3)} style={{...mano, fontSize: 64}}>{lang === 'es' ? 'Diseñado al revés' : 'Designed backwards'}</Trazo>
					<div style={{display: 'flex', alignItems: 'center', gap: 30}}>
						{pasos.map((p, i) => (
							<React.Fragment key={p}>
								<Trazo inicio={s(1.0 + i * 3.0)} style={{...grande, fontSize: 96 - i * 8, color: i === 2 ? C.verde : C.tinta, whiteSpace: 'nowrap'}}>{i + 1}. {p}</Trazo>
								{i < 2 ? <Trazo inicio={s(2.4 + i * 3.0)} style={{...grande, fontSize: 90, color: C.rojo}}>→</Trazo> : null}
							</React.Fragment>
						))}
					</div>
				</AbsoluteFill>
			</Papel>
		);
	}
	if (nombre === 'nombre') {
		const t = (x: number) => Math.round(x * d);
		return (
			<Papel>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
					<Trazo inicio={t(0.03)} style={{...grande, fontSize: 170}}>Fushigidane</Trazo>
					<Trazo inicio={t(0.12)} style={{...mano, fontSize: 70}}>fushigi = {lang === 'es' ? 'misterioso' : 'mysterious'} · tane = {lang === 'es' ? 'semilla' : 'seed'}</Trazo>
					<Trazo inicio={t(0.35)} style={{...mano, fontSize: 64, color: C.tinta}}>“Fushigi da ne?” = {lang === 'es' ? '¿a que es raro?' : "isn't that strange?"}</Trazo>
					<Trazo inicio={t(lang === 'es' ? 0.6 : 0.75)} style={{...grande, fontSize: 130, color: C.verde}}>Bulb + dinosaur</Trazo>
				</AbsoluteFill>
			</Papel>
		);
	}
	if (nombre === 'podio') {
		const t = (x: number) => Math.round(x * d);
		const col = (h: number, txt: string, puesto: string, ini: number, color: string) => (
			<Trazo inicio={ini} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<div style={{...grande, fontSize: 64, color}}>{txt}</div>
				<div style={{width: 300, height: h, background: color, opacity: 0.85, filter: 'url(#rough)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10}}>
					<span style={{...grande, fontSize: 90, color: C.papel}}>{puesto}</span>
				</div>
			</Trazo>
		);
		return (
			<Papel>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
					<Trazo inicio={t(0.05)} style={{...mano, fontSize: 60}}>{lang === 'es' ? 'Pokémon del Año 2020 · Kanto' : 'Pokémon of the Year 2020 · Kanto'}</Trazo>
					<div style={{display: 'flex', alignItems: 'flex-end', gap: 30}}>
						{col(260, 'Gengar', '2º', t(0.4), '#6d4b8f')}
						{col(340, 'Charizard', '1º', t(0.45), '#d9662b')}
						{col(200, 'Bulbasaur', '3º', t(0.35), C.verde)}
						<Trazo inicio={t(0.62)} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 40}}>
							<div style={{...grande, fontSize: 60, color: '#c9a300'}}>Pikachu</div>
							<div style={{...mano, fontSize: 90, color: C.rojo}}>4º</div>
						</Trazo>
					</div>
				</AbsoluteFill>
			</Papel>
		);
	}
	return <Papel />;
};
