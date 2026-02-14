import React, { useState } from 'react';
import { PlayCircle, Music, Lock } from 'lucide-react';
import type { Track } from '../data/tracks';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import PremiumModal from './PremiumModal';
import './TrackList.css';

interface TrackListProps {
    tracks: Track[];
    onSelect: (track: Track) => void;
    selectedTrackId?: string;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onSelect, selectedTrackId }) => {
    const { isPremium } = usePremiumStatus();
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    const handleTrackClick = (track: Track) => {
        if (track.isPremium && !isPremium) {
            setShowPremiumModal(true);
        } else {
            onSelect(track);
        }
    };

    return (
        <div className="track-list-container">
            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
            />
            <div className="track-list-header">
                <Music className="text-purple-400" size={24} color="var(--accent-color)" />
                <h2 className="track-list-title">Repertório</h2>
            </div>

            <div className="track-list-scroll custom-scrollbar">
                {tracks.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => handleTrackClick(track)}
                        className={`track-item ${selectedTrackId === track.id ? 'selected' : ''} ${track.isPremium && !isPremium ? 'locked' : ''}`}
                    >
                        <div className="track-info">
                            <span className="track-name flex items-center gap-2">
                                {track.name}
                                {track.isPremium && !isPremium && <Lock size={14} className="text-amber-400" />}
                            </span>
                            <span className="track-meta">
                                <span>{track.originalKey}</span> • <span>{track.bpm} BPM</span>
                            </span>
                        </div>

                        {selectedTrackId === track.id ? (
                            <PlayCircle size={20} className="playing-icon" />
                        ) : (
                            track.isPremium && !isPremium ? (
                                <Lock size={16} className="text-slate-500" />
                            ) : null
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrackList;
