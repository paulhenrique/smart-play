import React from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { PricingTable } from '@clerk/clerk-react';

interface PricingPageProps {
    onBack: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack }) => {
    // Note: 'PricingTable' must be a valid export from @clerk/clerk-react or a custom component.
    // Assuming standard usage or user-provided environment.

    return (
        <div className="fixed inset-0 z-50 bg-[#0f172a] text-white overflow-y-auto animate-in fade-in duration-300">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 flex flex-col min-h-full">
                {/* Header */}
                <header className="flex w-full justify-start mb-8">
                    <button
                        onClick={onBack}
                        className="group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-slate-300 hover:text-white border border-white/5 hover:border-white/10"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm">Voltar</span>
                    </button>
                </header>

                <main className="flex-1 flex flex-col items-center justify-start pb-12 text-center">

                    {/* Brand & Intro */}
                    <div className="mb-12 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 fade-in flex flex-col items-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl shadow-purple-500/10 flex items-center justify-center">
                                <PlayCircle size={48} className="text-purple-400" />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                            Desbloqueie o <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Smart Play Pro</span>
                        </h1>

                        <p className="text-lg text-slate-400 leading-relaxed mx-auto max-w-lg">
                            Tenha acesso ilimitado a todas as ferramentas profissionais.
                            Eleve sua performance musical com recursos exclusivos e suporte prioritário.
                        </p>
                    </div>

                    {/* Clerk Pricing Table Container */}
                    <div className="w-full max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in delay-100">
                        {/* We wrap the Clerk component to ensure it fits the theme or handles its own styling properly */}
                        <div className="pricing-table-wrapper rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm">
                            <PricingTable />
                        </div>
                        <p className="mt-6 text-xs text-slate-500">
                            Pagamento processado de forma segura. Cancele a qualquer momento.
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default PricingPage;
