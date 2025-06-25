// src/Main.tsx
import { AbsoluteFill, Audio, Img, useCurrentFrame, interpolate } from 'remotion';

type Props = {
  beats: number[];
  audio_url: string;
  audio_duration: number;
};

export const Main: React.FC<Props> = ({ beats, audio_url, audio_duration }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Effet flash sur chaque beat
  const isFlash = beats.some(
    (beat) => Math.abs(frame - beat * fps) < 2 // Flash 2 frames autour du beat
  );

  return (
    <AbsoluteFill>
      {/* Image de fond */}
      <Img
        src="/bg.png.jpg" // ou l'URL directe si tu ne veux pas la mettre dans public
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
        }}
      />
      {/* Musique */}
      {audio_url && <Audio src={audio_url} />}
      {/* Effet flash synchronisé */}
      {isFlash && (
        <AbsoluteFill style={{ background: 'rgba(255,255,255,0.3)' }} />
      )}
      {/* Tu peux ajouter ici d'autres effets (zoom, boom, etc.) */}
    </AbsoluteFill>
  );
};
