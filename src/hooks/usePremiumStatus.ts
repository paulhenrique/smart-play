import { useUser } from "@clerk/clerk-react";

export const usePremiumStatus = () => {
    const { user, isLoaded, isSignedIn } = useUser();

    // In strict mode, we might want to check for a specific value
    // For now, checks if isPremium is explicitly true
    const isPremium = user?.publicMetadata?.isPremium === true;

    return { isPremium, isLoaded, isSignedIn };
};
