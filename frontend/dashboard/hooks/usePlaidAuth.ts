// hooks/usePlaidAuth.ts
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getItem } from '@/utils/indexedDB'; // Get the access token from IndexedDB
import { decrypt } from '@/utils/encryption'; // Decrypt the access token from IndexedDB

export function usePlaidAuth() {
    const { user } = useUser();
    const [plaidToken, setPlaidToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPlaidToken() {
            if (user?.sub) {
                const encryptedToken = await getItem(user.sub); // Retrieve the token from IndexedDB
                if (encryptedToken) {
                    try {
                        const token = decrypt(encryptedToken); // Decrypt the token
                        setPlaidToken(token); // Set the token to state
                    } catch (error) {
                        console.error('Error decrypting token', error);
                    }
                }
            }
            setLoading(false);
        }

        loadPlaidToken();
    }, [user]);

    return { plaidToken, loading };
}
