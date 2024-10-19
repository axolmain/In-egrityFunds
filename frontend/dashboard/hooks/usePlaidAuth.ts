// hooks/usePlaidAuth.ts
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getItem } from '@/utils/indexedDB';  // Fetch stored Plaid token from IndexedDB
import { decrypt } from '@/utils/encryption';  // Decrypt the token

export function usePlaidAuth() {
    const { user } = useUser();
    const [plaidToken, setPlaidToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPlaidToken() {
            if (user?.sub) {
                console.log(`Fetching encrypted Plaid token for user: ${user.sub}`);

                try {
                    const encryptedToken = await getItem(user.sub);  // Retrieve the token from IndexedDB
                    if (encryptedToken) {
                        console.log('Encrypted token retrieved, attempting to decrypt...');
                        const token = decrypt(encryptedToken);
                        setPlaidToken(token);
                        console.log('Token successfully decrypted and set.');
                    } else {
                        console.warn(`No encrypted token found for user: ${user.sub}`);
                    }
                } catch (error) {
                    console.error('Error retrieving or decrypting token:', error);
                }
            } else {
                console.warn('No user found, skipping token retrieval.');
            }
            setLoading(false);
            console.log('Loading state set to false.');
        }

        loadPlaidToken();
    }, [user]);

    return { plaidToken, loading };
}
