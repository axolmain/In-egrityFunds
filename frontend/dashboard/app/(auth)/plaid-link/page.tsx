"use client"
import { useState, useEffect, MouseEvent } from 'react';
import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';
import axios from 'axios';

interface PlaidLinkResponse {
    link_token: string;
}

interface ExchangeTokenResponse {
    access_token: string;
}

const PlaidLinkComponent = () => {
    const [linkToken, setLinkToken] = useState<string | null>(null);

    useEffect(() => {
        const createLinkToken = async () => {
            try {
                const response = await axios.post<PlaidLinkResponse>('/api/plaid/create-link-token', {
                    client_user_id: 'your-unique-user-id', // Replace with actual user ID
                });
                setLinkToken(response.data.link_token);
            } catch (error) {
                console.error('Error generating link token:', error);
            }
        };
        createLinkToken();
    }, []);

    const onSuccess = async (public_token: string) => {
        try {
            const response = await axios.post<ExchangeTokenResponse>('/api/plaid/exchange-token', {
                public_token,
            });
            console.log('Access Token:', response.data.access_token);
        } catch (error) {
            console.error('Error exchanging public token:', error);
        }
    };

    const config: PlaidLinkOptions = {
        token: linkToken!,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        open();
    };

    return (
        <div>
            {linkToken && (
                <button onClick={handleClick} disabled={!ready}>
                    Connect Bank
                </button>
            )}
        </div>
    );
};

export default PlaidLinkComponent;