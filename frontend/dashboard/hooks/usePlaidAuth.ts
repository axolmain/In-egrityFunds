// hooks/usePlaidAuth.ts
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getItem, setItem } from '@/utils/indexedDB'; // IndexedDB utilities
import { decrypt, encrypt } from '@/utils/encryption'; // Encryption utilities

export function usePlaidAuth() {
    const { user } = useUser();
    const [plaidToken, setPlaidToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load the Plaid access token from IndexedDB on mount
    useEffect(() => {
        async function loadPlaidToken() {
            if (user?.sub) {
                const encryptedToken = await getItem(user.sub); // Retrieve the token from IndexedDB
                if (encryptedToken) {
                    try {
                        const token = decrypt(encryptedToken); // Decrypt the token
                        setPlaidToken(token); // Set the token in state
                    } catch (error) {
                        console.error('Error decrypting token', error);
                    }
                }
            }
            setLoading(false);
        }

        loadPlaidToken();
    }, [user]);

    // Expose `setPlaidToken` so it can be updated manually after Plaid connection
    return { plaidToken, setPlaidToken, loading };
}
