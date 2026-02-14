# Smart Music Play

Este é um WebApp para músicos tocarem junto com bases (backing tracks) e alterarem o tom em tempo real.

## Estrutura do Projeto

- **src/components/AudioPlayer.tsx**: O coração da aplicação. Gerencia o playback de áudio e o efeito de Pitch Shift usando Tone.js.
- **src/components/TrackList.tsx**: Lista de músicas disponíveis.
- **src/data/tracks.ts**: Onde você adiciona novas músicas.
- **public/audio/**: Coloque seus arquivos MP3 aqui.

## Como Adicionar Mais Músicas

1. Adicione o arquivo MP3 na pasta `public/audio/`.
2. Abra `src/data/tracks.ts`.
3. Adicione um novo objeto ao array `tracks`:

```typescript
{
  id: 'novo-id',
  name: 'Nome da Música',
  originalKey: 'C', // Tom original
  url: '/audio/nome-do-arquivo.mp3', // Caminho relativo a partir de public
  bpm: 120 // Opcional
}
```

## Como Rodar

```bash
npm install
npm run dev
```

Abra o navegador no endereço indicado (geralmente http://localhost:5173).

## Tecnologias

- **React + TypeScript**: Framework e linguagem.
- **Vite**: Build tool rápida.
- **Tone.js**: Biblioteca de áudio para Web Audio API (Pitch shifting e playback).
- **CSS Modules/Vanilla**: Estilização moderna com Glassmorphism.
