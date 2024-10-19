// components/PlaidLink.tsx

import { usePlaidLink } from 'react-plaid-link';
import { usePlaidAuth } from '../hooks/usePlaidAuth';

export function PlaidLink() {
    const { plaidToken, savePlaidToken, loading } = usePlaidAuth();

    const onSuccess = async (publicToken: string) => {
        // Exchange publicToken for access_token on your server
        const response = await fetch('/api/exchange-token', {
            method: 'POST',
            body: JSON.stringify({ publicToken }),
            headers: { 'Content-Type': 'application/json' },
        });
        const { accessToken } = await response.json();

        // Save the access token locally
        await savePlaidToken(accessToken);
    };

    const config = {
        token: null, // Use null for Link creation
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    if (loading) return <div>Loading...</div>;

    if (plaidToken) {
        return <div>You are already connected to Plaid</div>;
    }

    return (
        <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
        </button>
    );
}
