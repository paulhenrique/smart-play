import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const { user } = useUser();

    // Mapping for display
    const languages = {
        en: 'English',
        pt: 'Português',
        es: 'Español'
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        // Persist to Clerk (if possible/needed, usually browser preference is enough, 
        // but user requested checking if Clerk can store it. 
        // Ideally we would update user.unsafeMetadata here, but we need backend API or 
        // useUser().update() if available on client. 
        // Client-side user.update() allows updating unsafeMetadata.
        if (user) {
            user.update({
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    language: lng
                }
            }).catch(console.error);
        }
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                <Globe size={18} />
                <span className="text-xs font-medium uppercase">{i18n.language.split('-')[0]}</span>
            </button>

            <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {Object.entries(languages).map(([code, name]) => (
                    <button
                        key={code}
                        onClick={() => changeLanguage(code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 text-slate-300 hover:text-white ${i18n.language.startsWith(code) ? 'bg-slate-700/50 text-white' : ''}`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
