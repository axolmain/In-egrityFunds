// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import UserGreeting from "@/components/UserGreeting";
import PlaidConnection from "@/components/PlaidConnection";
import DashboardWidgets from "@/components/DashboardWidgets";
import {encrypt} from "@/utils/encryption";
import {setItem} from "@/utils/indexedDB";
import TransactionsTable from "@/components/financialComponents/TransactionsTable";
import {usePlaidTransactions} from "@/hooks/usePlaidTransactions";

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
  const { transactions, loading: transactionsLoading, error: transactionsError } = usePlaidTransactions(user?.sub || '');

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

      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);

      // Encrypt and save the access token to IndexedDB
      const encryptedToken = encrypt(accessToken);
      await setItem(user?.sub!, encryptedToken);

      setIsConnected(true);
    } catch (error) {
      console.error('Error exchanging public token:', error);
      setPlaidError('Failed to connect bank account');
    }
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
    return <div className="p-4 text-red-500">An error occurred: {authError.message}</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        {/* User Greeting */}
        <UserGreeting />

        {/* Plaid Connection Section */}
        <PlaidConnection
            linkToken={linkToken}
            onSuccess={onSuccess}
            plaidError={plaidError}
            ready={Boolean(linkToken)}
        />

        {/* Dashboard Widgets */}
        <DashboardWidgets />

        {/* Transactions Table */}
        {transactionsError ? (
            <div className="text-red-500">{transactionsError}</div>
        ) : (
            <TransactionsTable transactions={transactions} />
        )}
      </div>
  );
}
