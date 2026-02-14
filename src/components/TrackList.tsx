import React from 'react';
import { PlayCircle, Music } from 'lucide-react';
import type { Track } from '../data/tracks';
import './TrackList.css';

interface TrackListProps {
    tracks: Track[];
    onSelect: (track: Track) => void;
    selectedTrackId?: string;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onSelect, selectedTrackId }) => {
    return (
        <div className="track-list-container">
            <div className="track-list-header">
                <Music className="text-purple-400" size={24} color="var(--accent-color)" />
                <h2 className="track-list-title">Repertório</h2>
            </div>

            <div className="track-list-scroll custom-scrollbar">
                {tracks.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => onSelect(track)}
                        className={`track-item ${selectedTrackId === track.id ? 'selected' : ''}`}
                    >
                        <div className="track-info">
                            <span className="track-name">
                                {track.name}
                            </span>
                            <span className="track-meta">
                                <span>{track.originalKey}</span> • <span>{track.bpm} BPM</span>
                            </span>
                        </div>

                        {selectedTrackId === track.id && (
                            <PlayCircle size={20} className="playing-icon" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrackList;
