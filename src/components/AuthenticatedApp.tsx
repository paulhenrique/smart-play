import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer';
import TrackList from './TrackList';
import PricingPage from './PricingPage';
import LanguageSwitcher from './LanguageSwitcher';
import SEO from './SEO';
import { tracks } from '../data/tracks';
import type { Track } from '../data/tracks';

type ViewState = 'player' | 'pricing';

const AuthenticatedApp: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
    const [view, setView] = useState<ViewState>('player');

    useEffect(() => {
        if (user && user.unsafeMetadata?.language) {
            const savedLang = user.unsafeMetadata.language as string;
            if (savedLang && i18n.language !== savedLang) {
                i18n.changeLanguage(savedLang);
            }
        }
    }, [user, i18n]);

    // If view is 'pricing', render the full page component
    if (view === 'pricing') {
        return <PricingPage onBack={() => setView('player')} />;
    }

    return (
        <div className="app-container">
            <SEO
                title={t('app.title')}
                description={t('app.subtitle')}
            />
            <div className="main-wrapper">

                <header className="app-header">
                    <div className="header-left">
                        <div className="logo-container">
                            <PlayCircle size={48} className="text-white" color="white" />
                        </div>
                        <div>
                            <h1 className="app-title">
                                {t('app.title')}
                            </h1>
                            <p className="app-subtitle">
                                {t('app.subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="auth-container flex items-center gap-4">
                        <LanguageSwitcher />
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
                            <p className="footer-main">{t('app.footer.powered')}</p>
                            <p className="footer-note">
                                {t('app.footer.note')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticatedApp;
