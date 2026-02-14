import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import AudioPlayer from './components/AudioPlayer';
import TrackList from './components/TrackList';
import { tracks } from './data/tracks';
import type { Track } from './data/tracks';
import './App.css';

const App: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <div className="app-container">
      <div className="main-wrapper">

        <header className="app-header">
          <div className="logo-container">
            <PlayCircle size={48} className="text-white" color="white" />
          </div>
          <h1 className="app-title">
            Smart Play
          </h1>
          <p className="app-subtitle">
            Backing Tracks & Real-time Transposition
          </p>
        </header>

        <div className="content-grid">
          {/* Sidebar List */}
          <div className={`sidebar ${selectedTrack ? 'mobile-hidden' : ''}`}>
            <TrackList
              tracks={tracks}
              onSelect={setSelectedTrack}
              selectedTrackId={selectedTrack?.id}
            />
          </div>

          {/* Player Area */}
          <div className={`player-area ${!selectedTrack ? 'mobile-hidden' : ''}`}>
            <AudioPlayer
              track={selectedTrack}
              onBack={() => setSelectedTrack(null)}
            />

            <div className="footer-info">
              <p className="footer-main">Powered by Tone.js Audio Engine</p>
              <p className="footer-note">
                Use fones de ouvido para melhor experiência.
                A alteração de tom pode gerar artefatos em mudanças extremas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
