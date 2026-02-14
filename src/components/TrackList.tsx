import React, { useState, useMemo } from 'react';
import { PlayCircle, Music, Lock, Search } from 'lucide-react';
import type { Track } from '../data/tracks';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { useTranslation } from 'react-i18next';
import { matchSorter } from 'match-sorter';
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
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTracks = useMemo(() => {
        if (!searchQuery) return tracks;
        return matchSorter(tracks, searchQuery, { keys: ['name', 'originalKey', 'bpm'] });
    }, [tracks, searchQuery]);

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
                <div className="flex items-center gap-3 mb-4">
                    <Music className="text-purple-400" size={24} color="var(--accent-color)" />
                    <h2 className="track-list-title">{t('trackList.title')}</h2>
                </div>

                <div className="search-container">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder={t('trackList.searchPlaceholder') || "Search tracks..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="track-list-scroll custom-scrollbar">
                {filteredTracks.length > 0 ? (
                    filteredTracks.map((track) => (
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
                    ))
                ) : (
                    <div className="no-results">
                        <p>{t('trackList.noResults') || "No tracks found"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackList;
