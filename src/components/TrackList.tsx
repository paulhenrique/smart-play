import React from 'react';
import { PlayCircle, Music, Lock } from 'lucide-react';
import type { Track } from '../data/tracks';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { useTranslation } from 'react-i18next';
import './TrackList.css';

interface TrackListProps {
    tracks: Track[];
    onSelect: (track: Track) => void;
    onShowPremium: () => void;
    selectedTrackId?: string;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onSelect, onShowPremium, selectedTrackId }) => {
    const { isPremium } = usePremiumStatus();
    const { t } = useTranslation();

    const handleTrackClick = (track: Track) => {
        if (track.isPremium && !isPremium) {
            onShowPremium();
        } else {
            onSelect(track);
        }
    };

    return (
        <div className="track-list-container">
            <div className="track-list-header">
                <Music className="text-purple-400" size={24} color="var(--accent-color)" />
                <h2 className="track-list-title">{t('trackList.title')}</h2>
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
