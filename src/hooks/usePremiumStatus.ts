import { useAuth } from "@clerk/clerk-react";

export const usePremiumStatus = () => {
    const { isLoaded, isSignedIn, has } = useAuth();
    // Check if user has the 'pro_access' permission from Clerk Billing
    // We also keep the metadata check as a fallback if you manually assigned it
    const isPremium = has?.({ plan: 'pro_access' }) || false;

    return { isPremium, isLoaded, isSignedIn };
};
