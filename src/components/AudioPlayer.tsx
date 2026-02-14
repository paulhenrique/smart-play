import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Play, Pause, Square, Music, Volume2, Plus, Minus } from 'lucide-react';
import type { Track } from '../data/tracks';
import './AudioPlayer.css';

interface AudioPlayerProps {
    track: Track | null;
    onBack?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [volume, setVolume] = useState(-5); // dB
    const [pitch, setPitch] = useState(0); // Semitones
    const [speed, setSpeed] = useState(1); // Playback Rate
    const [isLoading, setIsLoading] = useState(false);
    const [, setDuration] = useState(0);

    const playerRef = useRef<Tone.GrainPlayer | null>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Stop and clean up previous player instance whenever track changes
        if (playerRef.current) {
            playerRef.current.stop();
            playerRef.current.dispose();
            playerRef.current = null;
        }
        setIsPlaying(false);
        setIsReady(false);

        if (!track) return;

        const loadAudio = async () => {
            setIsLoading(true);

            try {
                await Tone.loaded();

                // GrainPlayer allows independent pitch and speed control
                const grainPlayer = new Tone.GrainPlayer({
                    url: track.url,
                    loop: true,
                    grainSize: 0.1, // Optimized for music
                    overlap: 0.05,
                    playbackRate: speed,
                    detune: pitch * 100, // Cents (100 cents = 1 semitone)
                    onload: () => {
                        setIsReady(true);
                        setIsLoading(false);
                        // Tone.GrainPlayer buffer duration
                        setDuration(grainPlayer.buffer.duration);
                    },
                    onerror: (err: Error) => {
                        console.error("Error loading track", err);
                        setIsLoading(false);
                    }
                }).toDestination();

                playerRef.current = grainPlayer;
                Tone.Destination.volume.value = volume;

            } catch (error) {
                console.error("Setup error", error);
                setIsLoading(false);
            }
        };

        loadAudio();

        // Cleanup function for when component unmounts or track changes again
        return () => {
            if (playerRef.current) {
                playerRef.current.stop();
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [track]);

    // Speed and Pitch Effect Logic
    useEffect(() => {
        if (playerRef.current) {
            // GrainPlayer handles this natively
            playerRef.current.playbackRate = speed;
            playerRef.current.detune = pitch * 100;
        }
    }, [pitch, speed]);

    useEffect(() => {
        Tone.Destination.volume.value = volume;
    }, [volume]);

    // Animation loop logic could go here

    const togglePlay = async () => {
        if (!isReady || !playerRef.current) return;

        await Tone.start();

        if (isPlaying) {
            playerRef.current.stop();
            setIsPlaying(false);
        } else {
            playerRef.current.start();
            setIsPlaying(true);
        }
    };

    const handleStop = () => {
        if (playerRef.current) {
            playerRef.current.stop();
            setIsPlaying(false);
        }
    }

    const changePitch = (semitone: number) => {
        setPitch(prev => {
            const newPitch = prev + semitone;
            return Math.max(-12, Math.min(12, newPitch));
        });
    };

    const changeSpeedByPercentage = (percent: number) => {
        setSpeed(prev => {
            const newSpeed = prev + (percent / 100);
            return Math.max(0.5, Math.min(1.5, Number(newSpeed.toFixed(2))));
        });
    };

    const changeSpeedByBpm = (bpmDelta: number) => {
        if (!track || !track.bpm) return;
        const currentBpm = track.bpm * speed;
        const newBpm = currentBpm + bpmDelta;
        const newSpeed = newBpm / track.bpm;

        setSpeed(Math.max(0.5, Math.min(1.5, newSpeed)));
    };

    if (!track) {
        return (
            <div className="audio-player-container empty-state">
                <Music size={48} opacity={0.5} />
                <p className="track-title" style={{ fontSize: '1.25rem', opacity: 0.7 }}>Selecione uma base para começar</p>
            </div>
        );
    }

    return (
        <div className="audio-player-container">
            {/* Header */}
            <div className="player-header">
                <div className="track-display">
                    {onBack && (
                        <button className="btn-back-mobile" onClick={onBack}>
                            ← Voltar
                        </button>
                    )}
                    <h2 className="track-title">{track.name}</h2>
                    <div className="track-meta-badges">
                        <span className="badge badge-purple">
                            Tom Original: {track.originalKey}
                        </span>
                        {track.bpm && (
                            <span className="badge badge-purple" style={{ borderColor: 'rgba(59, 130, 246, 0.3)', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd' }}>
                                {(track.bpm * speed).toFixed(0)} BPM
                            </span>
                        )}
                        {pitch !== 0 && (
                            <span className={`badge ${pitch > 0 ? 'badge-pitch' : 'badge-pitch-neg'}`}>
                                {pitch > 0 ? '+' : ''}{pitch} Semitons
                            </span>
                        )}
                    </div>
                </div>
                {!isReady && isLoading && <div className="loading-text">Carregando...</div>}
            </div>

            {/* Controls */}
            <div className="controls-grid">

                {/* Left Column: Playback & Speed */}
                <div className="control-group">
                    <span className="label-text">Playback</span>
                    <div className="playback-buttons">
                        <button
                            onClick={togglePlay}
                            disabled={!isReady}
                            className={`btn-main ${isPlaying ? 'btn-pause' : 'btn-play'}`}
                        >
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                            {isPlaying ? 'Pausar' : 'Tocar'}
                        </button>

                        <button
                            onClick={handleStop}
                            disabled={!isReady}
                            className="btn-stop"
                            title="Stop"
                        >
                            <Square size={20} fill="currentColor" />
                        </button>
                    </div>

                    {/* Speed Control */}
                    <div className="speed-control-box">
                        <div className="speed-header">
                            <span className="label-text">
                                {track?.bpm
                                    ? `Velocidade (${Math.round(track.bpm * speed)} BPM)`
                                    : `Velocidade (${Math.round(speed * 100)}%)`
                                }
                            </span>
                            <button className="btn-speed-reset" onClick={() => setSpeed(1)}>
                                Reset
                            </button>
                        </div>

                        <div className="speed-actions">
                            {track?.bpm ? (
                                <>
                                    <button onClick={() => changeSpeedByBpm(-10)} className="btn-speed-inc">-10</button>
                                    <button onClick={() => changeSpeedByBpm(-5)} className="btn-speed-inc">-5</button>
                                    <button onClick={() => changeSpeedByBpm(5)} className="btn-speed-inc">+5</button>
                                    <button onClick={() => changeSpeedByBpm(10)} className="btn-speed-inc">+10</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => changeSpeedByPercentage(-10)} className="btn-speed-inc">-10%</button>
                                    <button onClick={() => changeSpeedByPercentage(-5)} className="btn-speed-inc">-5%</button>
                                    <button onClick={() => changeSpeedByPercentage(5)} className="btn-speed-inc">+5%</button>
                                    <button onClick={() => changeSpeedByPercentage(10)} className="btn-speed-inc">+10%</button>
                                </>
                            )}
                        </div>

                        <div className="speed-slider-container">
                            <input
                                type="range"
                                min="0.5"
                                max="1.5"
                                step="0.01"
                                value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className="volume-slider"
                            />
                            <div className="speed-slider-labels">
                                <span>{track?.bpm ? Math.round(track.bpm * 0.5) : '-50%'}</span>
                                <span>{track?.bpm ? track.bpm : 'Original'}</span>
                                <span>{track?.bpm ? Math.round(track.bpm * 1.5) : '+50%'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Volume */}
                    <div className="volume-control">
                        <Volume2 size={20} color="#94a3b8" />
                        <input
                            type="range"
                            min="-60"
                            max="0"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="volume-slider"
                        />
                    </div>
                </div>

                {/* Right Column: Pitch */}
                <div className="control-group">
                    <span className="label-text">Tonalidade (Pitch)</span>

                    <div className="pitch-display-box">
                        <button
                            onClick={() => changePitch(-1)}
                            className="pitch-action-btn"
                        >
                            <Minus size={20} />
                        </button>

                        <div className="pitch-value">
                            <span className="pitch-number">
                                {pitch > 0 ? `+${pitch}` : pitch}
                            </span>
                            <span className="pitch-unit">Semitons</span>
                        </div>

                        <button
                            onClick={() => changePitch(1)}
                            className="pitch-action-btn"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => setPitch(0)}
                        disabled={pitch === 0}
                        className="btn-reset"
                    >
                        Resetar Tom
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
