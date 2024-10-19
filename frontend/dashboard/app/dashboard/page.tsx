'use client';
import { useState, useEffect, MouseEvent } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';
import axios from 'axios';

interface PlaidLinkResponse {
  link_token: string;
}

interface ExchangeTokenResponse {
  access_token: string;
}

export default function Dashboard() {
  const { user, isLoading, error: authError } = useUser();
  const router = useRouter();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [plaidError, setPlaidError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (user) {
      const createLinkToken = async () => {
        try {
          const response = await axios.post<PlaidLinkResponse>('/api/plaid/create-link-token', {
            client_user_id: user.sub, // Using Auth0's user ID
          });
          setLinkToken(response.data.link_token);
        } catch (error) {
          console.error('Error generating link token:', error);
          setPlaidError('Failed to initialize bank connection');
        }
      };
      createLinkToken();
    }
  }, [user]);

  const onSuccess = async (public_token: string) => {
    try {
      const response = await axios.post<ExchangeTokenResponse>('/api/plaid/exchange-token', {
        public_token,
        userId: user?.sub, // Include user ID for backend association
      });
      console.log('Access Token:', response.data.access_token);
      setIsConnected(true);
      // You might want to store this state in your database
    } catch (error) {
      console.error('Error exchanging public token:', error);
      setPlaidError('Failed to connect bank account');
    }
  };

  const config: PlaidLinkOptions = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handlePlaidClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPlaidError(null); // Reset any previous errors
    open();
  };

  // Loading state
  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    );
  }

  // Not authenticated
  if (!user) {
    router.push('/api/auth/login');
    return null;
  }

  // Authentication error
  if (authError) {
    return (
        <div className="p-4 text-red-500">
          An error occurred: {authError.message}
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">Manage your financial dashboard</p>
        </div>

        {/* Plaid Connection Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Bank Connection</h2>

          {plaidError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {plaidError}
              </div>
          )}

          {isConnected ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Your bank account is connected!
              </div>
          ) : (
              <button
                  onClick={handlePlaidClick}
                  disabled={!ready || !linkToken}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {!linkToken ? 'Loading...' : 'Connect Your Bank'}
              </button>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your dashboard widgets/components here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Account Overview</h3>
            <p className="text-gray-600">Your dashboard content goes here.</p>
          </div>
        </div>
      </div>
  );
}