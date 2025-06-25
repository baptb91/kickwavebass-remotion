// server.js
const express = require('express');
const { renderMedia } = require('@remotion/renderer');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/make', async (req, res) => {
  const { inputs } = req.body;
  // Parse les beats si c'est une string JSON
  const beats = typeof inputs.beats === 'string' ? JSON.parse(inputs.beats) : inputs.beats;
  const audio_url = inputs.audio_url;
  const audio_duration = Number(inputs.audio_duration);

  // Calcul du nombre de frames (fps * durée)
  const fps = 30;
  const durationInFrames = Math.ceil(audio_duration * fps);

  try {
    const outPath = path.join(__dirname, 'out.mp4');
    await renderMedia({
      serveUrl: 'http://localhost:3000', // Studio Remotion doit tourner sur ce port
      composition: 'main',
      codec: 'h264',
      outputLocation: outPath,
      inputProps: {
        beats,
        audio_url,
        audio_duration,
      },
      fps,
      height: 1920,
      width: 1080,
      durationInFrames,
    });
    res.download(outPath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du rendu');
  }
});

app.listen(8000, () => console.log('Serveur rendu Remotion sur http://localhost:8000'));
