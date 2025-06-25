const express = require('express');
const { renderMedia } = require('@remotion/renderer');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/make', async (req, res) => {
  try {
    const { inputs } = req.body;

    // Sécurisation des données reçues
    const beats = typeof inputs.beats === 'string' ? JSON.parse(inputs.beats) : inputs.beats || [];
    const audio_url = inputs.audio_url || '';
    const audio_duration = Number(inputs.audio_duration) || 15;

    // Définition explicite et sécurisée des dimensions et fps
    const fps = 30;
    const width = 1080;
    const height = 1920;
    // Toujours pair, toujours numériques
    if (isNaN(audio_duration) || audio_duration <= 0) {
      return res.status(400).send('audio_duration doit être un nombre positif');
    }
    const durationInFrames = Math.ceil(audio_duration * fps);

    // Log pour debug
    console.log('Rendering with:', { width, height, durationInFrames, beats, audio_url });

    const outPath = path.join(__dirname, 'out.mp4');
    await renderMedia({
      serveUrl: 'http://localhost:3000', // Adapter si besoin pour Render
      composition: 'main',
      codec: 'h264',
      outputLocation: outPath,
      inputProps: {
        beats,
        audio_url,
        audio_duration,
      },
      fps,
      height,
      width,
      durationInFrames,
    });
    res.download(outPath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du rendu : ' + err.message);
  }
});

app.listen(8000, () => console.log('Serveur rendu Remotion sur http://localhost:8000'));
