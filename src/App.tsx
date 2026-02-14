import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import AudioPlayer from './components/AudioPlayer';
import TrackList from './components/TrackList';
import PricingPage from './components/PricingPage'; // New Component
import { tracks } from './data/tracks';
import type { Track } from './data/tracks';
import './App.css';

type ViewState = 'player' | 'pricing';

const App: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [view, setView] = useState<ViewState>('player');

  // If view is 'pricing', render the full page component
  if (view === 'pricing') {
    return <PricingPage onBack={() => setView('player')} />;
  }

  return (
    <div className="app-container">
      <div className="main-wrapper">

        <header className="app-header">
          <div className="header-left">
            <div className="logo-container">
              <PlayCircle size={48} className="text-white" color="white" />
            </div>
            <div>
              <h1 className="app-title">
                Smart Play
              </h1>
              <p className="app-subtitle">
                Backing Tracks & Real-time Transposition
              </p>
            </div>
          </div>

          <div className="auth-container">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-login">Entrar</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 border-2 border-white/20"
                  }
                }}
              />
            </SignedIn>
          </div>
        </header>

        <div className="content-grid">
          {/* Sidebar List */}
          <div className={`sidebar ${selectedTrack ? 'mobile-hidden' : ''}`}>
            <TrackList
              tracks={tracks}
              onSelect={setSelectedTrack}
              selectedTrackId={selectedTrack?.id}
              onShowPremium={() => setView('pricing')}
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
