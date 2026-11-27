import {Composition, AbsoluteFill} from 'remotion';
const Prueba: React.FC = () => <AbsoluteFill style={{background:'#1f3a26',color:'white',fontSize:80,justifyContent:'center',alignItems:'center'}}>Crónicas del Entrenador</AbsoluteFill>;
export const RemotionRoot: React.FC = () => (<>
  <Composition id="Prueba" component={Prueba} durationInFrames={30} fps={30} width={1920} height={1080} />
</>);
