# TikTok Viral Agent

Agente web che crea proposte complete per video virali da 10 secondi su TikTok: idea, script, storyboard visivo, caption, CTA, hashtag e piano di pubblicazione.

## 🚀 Avvio rapido

```bash
npm install
npm run dev
# apri http://localhost:3000
```

### Build produzione

```bash
npm run build
npm start
```

## ✨ Funzionalità

- Generatore di hook e idee basati su trend TikTok aggiornati.
- Blueprint visivo scena-per-scena con transizioni e testi on-screen.
- Script parlato, audio consigliati e call to action ottimizzate.
- Caption e set di hashtag strategici per nicchie differenti.
- Consigli di formato video, titolo asset e timing di pubblicazione.
- Interfaccia glassmorphism responsive pronta per il deploy su Vercel.

## 🛠️ Stack

- [Next.js 14](https://nextjs.org) con App Router.
- React 18 con componenti client-side.
- CSS personalizzato per tema dark futuristico.

## 📁 Struttura

```
app/
  layout.tsx      # Layout e metadata
  page.tsx        # Pagina principale con IdeaGenerator
  globals.css     # Stili globali
components/
  idea-generator.tsx  # Logica del generatore e UI
```

## 📄 Licenza

MIT
