import React, { useState } from 'react';
import { X, Check, Star } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
    const { openUserProfile } = useClerk();
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubscribe = async () => {
        setIsLoading(true);
        // Opens the Clerk User Profile directly to the "Manage account" or Billing section
        // Clerk handles the UI for subscribing to the configured plan
        try {
            await openUserProfile();
            onClose();
        } catch (err) {
            console.error("Failed to open user profile", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                        <Star size={32} className="text-white fill-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Desbloqueie o Smart Play Pro</h2>
                    <p className="text-slate-400">Acesso ilimitado a todas as Backing Tracks e recursos exclusivos.</p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-200">
                        <div className="bg-green-500/20 p-1 rounded-full text-green-400">
                            <Check size={16} />
                        </div>
                        <span>Acesso a todas as faixas Premium</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-200">
                        <div className="bg-green-500/20 p-1 rounded-full text-green-400">
                            <Check size={16} />
                        </div>
                        <span>Transposição de tom ilimitada</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-200">
                        <div className="bg-green-500/20 p-1 rounded-full text-green-400">
                            <Check size={16} />
                        </div>
                        <span>Controle de BPM avançado</span>
                    </div>
                </div>

                <button
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Gerenciar Assinatura'
                    )}
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                    Gerenciado com segurança via Clerk & Stripe.
                </p>
            </div>
        </div>
    );
};

export default PremiumModal;
