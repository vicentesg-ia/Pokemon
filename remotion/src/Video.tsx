import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {FiltrosCrayon, FuentesCrayon} from './estilo';
import {Blanco, Clip, EscenaCarta, EscenaRecord, Grafico, Ilustracion, Lang, Rotulo} from './componentes';

// ---------- Tipos del plan (videos/<NNN>/montaje/plan.json + duraciones) ----------
type Shot = {tipo: string; src?: string; desde?: number; dur?: number; peso?: number; mov?: string; particulas?: boolean; grafico?: string; cartas?: string[]; carta?: string; precio?: any; precio_izq?: any; etiqueta?: any; brillo?: boolean};
type Escena = {id: string; musica: string; bloque?: boolean; shots: Shot[]; rotulo?: {tipo: string; at: number; relativo?: boolean; es: string[]; en: string[]}; sfx?: {src: string; at: number; relativo?: boolean; vol: number}[]; voz: Record<Lang, {src: string; dur: number}>};
export type Plan = {raiz: string; fps: number; padding: number; escenas: Escena[]};

const VOL = {voz: 1, ambiental: 0.09, epica: 0.16};

export const duracionEscena = (e: Escena, lang: Lang, plan: Plan) => Math.round((e.voz[lang].dur + plan.padding) * plan.fps);
export const duracionTotal = (plan: Plan, lang: Lang) => plan.escenas.reduce((a, e) => a + duracionEscena(e, lang, plan), 0);

const segAFrames = (at: number, relativo: boolean | undefined, total: number, fps: number) => {
	if (relativo) return Math.round(at * total);
	if (at < 0) return Math.max(0, total + Math.round(at * fps));
	return Math.round(at * fps);
};

// Reparte la duración de la escena entre sus planos: los que tienen 'dur' fija la usan; el resto se reparte por 'peso'.
const repartirShots = (shots: Shot[], total: number, fps: number) => {
	const fijos = shots.reduce((a, s) => a + (s.dur ? Math.round(s.dur * fps) : 0), 0);
	const libres = shots.filter((s) => !s.dur);
	const pesoTotal = libres.reduce((a, s) => a + (s.peso ?? 1), 0) || 1;
	let resto = Math.max(0, total - fijos);
	const out: {shot: Shot; from: number; dur: number}[] = [];
	let cursor = 0;
	shots.forEach((s, i) => {
		let d = s.dur ? Math.round(s.dur * fps) : Math.round((resto * (s.peso ?? 1)) / pesoTotal);
		if (i === shots.length - 1) d = total - cursor; // el último plano cierra la escena
		out.push({shot: s, from: cursor, dur: Math.max(1, d)});
		cursor += d;
	});
	return out;
};

const RenderShot: React.FC<{s: Shot; lang: Lang}> = ({s, lang}) => {
	if (s.tipo === 'ilu') return <Ilustracion src={`${RAIZ.v}/${s.src}`} mov={s.mov} particulas={s.particulas} />;
	if (s.tipo === 'clip') return <Clip src={`${RAIZ.v}/${s.src}`} desde={s.desde} />;
	if (s.tipo === 'blanco') return <Blanco />;
	if (s.tipo === 'grafico') return <Grafico nombre={s.grafico!} lang={lang} />;
	if (s.tipo === 'carta') return <EscenaCarta lang={lang} cartas={s.cartas!.map((c) => `${RAIZ.v}/${c}`)} precio={s.precio} precioIzq={s.precio_izq} etiqueta={s.etiqueta} brillo={s.brillo} />;
	if (s.tipo === 'record') return <EscenaRecord lang={lang} carta={`${RAIZ.v}/${s.carta}`} />;
	return null;
};

const RAIZ = {v: ''};

export const VideoCronica: React.FC<{plan: Plan; lang: Lang}> = ({plan, lang}) => {
	const {fps} = useVideoConfig();
	RAIZ.v = plan.raiz;
	const total = duracionTotal(plan, lang);
	let cursor = 0;
	const tramos = plan.escenas.map((e) => {
		const d = duracionEscena(e, lang, plan);
		const t = {e, from: cursor, dur: d};
		cursor += d;
		return t;
	});

	// Música épica: un tramo por cada grupo de escenas seguidas marcadas como 'epica'.
	const epicas: {from: number; dur: number}[] = [];
	tramos.forEach((t) => {
		const ult = epicas[epicas.length - 1];
		if (t.e.musica === 'epica') {
			if (ult && ult.from + ult.dur === t.from) ult.dur += t.dur;
			else epicas.push({from: t.from, dur: t.dur});
		}
	});
	const enEpica = (f: number) => epicas.some((x) => f >= x.from - 15 && f < x.from + x.dur + 15);

	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<FuentesCrayon />
			<FiltrosCrayon />
			{tramos.map(({e, from, dur}) => (
				<Sequence key={e.id} from={from} durationInFrames={dur} name={`Escena ${e.id}`}>
					{repartirShots(e.shots, dur, fps).map(({shot, from: f0, dur: d0}, i) => (
						<Sequence key={i} from={f0} durationInFrames={d0}>
							<RenderShot s={shot} lang={lang} />
						</Sequence>
					))}
					{e.rotulo ? <Rotulo tipo={e.rotulo.tipo} lineas={e.rotulo[lang]} inicio={segAFrames(e.rotulo.at, e.rotulo.relativo, dur, fps)} /> : null}
					<Audio src={staticFile(`${plan.raiz}/${e.voz[lang].src}`)} volume={VOL.voz} />
					{(e.sfx ?? []).map((x, i) => (
						<Sequence key={`sfx${i}`} from={segAFrames(x.at, x.relativo, dur, fps)}>
							<Audio src={staticFile(`${plan.raiz}/${x.src}`)} volume={x.vol * 0.55} />
						</Sequence>
					))}
				</Sequence>
			))}

			{/* Música ambiental en bucle; se apaga cuando suena la épica */}
			<Audio
				src={staticFile(`${plan.raiz}/musica/ambiental.mp3`)}
				loop
				volume={(f) => (enEpica(f) ? 0 : VOL.ambiental) * interpolate(f, [total - 90, total], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
			/>
			{epicas.map((x, i) => (
				<Sequence key={`epica${i}`} from={Math.max(0, x.from - 10)} durationInFrames={x.dur + 25}>
					<Audio
						src={staticFile(`${plan.raiz}/musica/epica.mp3`)}
						startFrom={i === 0 ? 0 : 20 * fps}
						volume={(f) => VOL.epica * interpolate(f, [0, 15, x.dur + 5, x.dur + 25], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
					/>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
