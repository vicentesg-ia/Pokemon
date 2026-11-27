import React from 'react';
import {Composition} from 'remotion';
import {VideoCronica, Plan, duracionTotal} from './Video';
import plan001 from './data/001-bulbasaur.json';

// Un vídeo = dos composiciones (ES y EN) con las mismas imágenes y distinta voz/rótulos.
const videos: Record<string, Plan> = {'001': plan001 as unknown as Plan};

export const RemotionRoot: React.FC = () => (
	<>
		{Object.entries(videos).flatMap(([num, plan]) =>
			(['es', 'en'] as const).map((lang) => (
				<Composition
					key={`${num}-${lang}`}
					id={`V${num}-${lang.toUpperCase()}`}
					component={VideoCronica}
					durationInFrames={duracionTotal(plan, lang)}
					fps={plan.fps}
					width={1920}
					height={1080}
					defaultProps={{plan, lang}}
				/>
			)),
		)}
	</>
);
