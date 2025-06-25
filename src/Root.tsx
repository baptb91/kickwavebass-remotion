// src/Root.tsx
import { Composition } from 'remotion';
import { Main } from './Main';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="main"
      component={Main}
      durationInFrames={450} // Valeur par défaut, sera remplacée par la prop duration
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        beats: [],
        audio_url: "",
        audio_duration: 15,
      }}
    />
  </>
);
