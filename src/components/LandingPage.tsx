import React from 'react';
import { useTranslation } from 'react-i18next';
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { PlayCircle, Music, Zap, Cloud, ArrowRight } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const LandingPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-purple-500/30">

            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-500/20">
                            <PlayCircle size={28} className="text-white" />
                        </div>
                        <span className="self-center text-xl font-bold whitespace-nowrap tracking-tight">Smart Play</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        <div className="hidden md:flex items-center gap-3">
                            <SignInButton mode="modal">
                                <button className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    {t('landing.ctaLogin')}
                                </button>
                            </SignInButton>

                            <SignUpButton mode="modal">
                                <button className="px-5 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all hover:scale-105 active:scale-95">
                                    {t('landing.ctaStart')}
                                </button>
                            </SignUpButton>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                        v2.0 Now Available
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        {t('landing.heroTitle')}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {t('landing.heroSubtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <SignUpButton mode="modal">
                            <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                {t('landing.ctaStart')}
                                <ArrowRight size={18} />
                            </button>
                        </SignUpButton>

                        <SignInButton mode="modal">
                            <button className="w-full sm:w-auto px-8 py-4 text-base font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300">
                                {t('landing.ctaLogin')}
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-900/50 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.featuresTitle')}</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                <Music size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">{t('landing.feature1Title')}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {t('landing.feature1Desc')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 duration-300 delay-100">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">{t('landing.feature2Title')}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {t('landing.feature2Desc')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 duration-300 delay-200">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                                <Cloud size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">{t('landing.feature3Title')}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {t('landing.feature3Desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} Smart Play. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
