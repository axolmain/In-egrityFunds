// components/PlaidConnection.tsx
import { FC, MouseEvent } from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface PlaidConnectionProps {
    linkToken: string | null;
    onSuccess: (public_token: string) => Promise<void>;
    plaidError: string | null;
    ready: boolean;
}

const PlaidConnection: FC<PlaidConnectionProps> = ({ linkToken, onSuccess, plaidError, ready }) => {
    const { open } = usePlaidLink({
        token: linkToken!,
        onSuccess,
    });

    const handlePlaidClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        open();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Bank Connection</h2>
            {plaidError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {plaidError}
                </div>
            )}
            {linkToken ? (
                <button
                    onClick={handlePlaidClick}
                    disabled={!ready}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Connect Your Bank
                </button>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default PlaidConnection;
