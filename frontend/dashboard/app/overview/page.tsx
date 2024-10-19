// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { encrypt } from '@/utils/encryption';
import { setItem } from '@/utils/indexedDB';
import TransactionsTable from '@/components/financialComponents/TransactionsTable';
import { usePlaidTransactions } from '@/hooks/usePlaidTransactions';
import AccountBalances from '@/components/financialComponents/AccountBalances';
import SpendingCategories from '@/components/financialComponents/SpendingCategories';
import BudgetSummary from '@/components/financialComponents/BudgetSummary';
import SpendingTrendsChart from '@/components/financialComponents/SpendingTrendsChart';

interface PlaidLinkResponse {
  link_token: string;
}

interface ExchangeTokenResponse {
  access_token: string;
}

export default function Overview() {
  const { user, isLoading, error: authError } = useUser();
  const router = useRouter();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [plaidError, setPlaidError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = usePlaidTransactions(user?.sub || '');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('monthly'); // Default time period is 'monthly'

  //TODO: abstract away
  useEffect(() => {
    if (user) {
      const createLinkToken = async () => {
        try {
          const response = await axios.post<PlaidLinkResponse>(
            '/api/plaid/create-link-token',
            {
              client_user_id: user.sub, // Using Auth0's user ID
            }
          );
          setLinkToken(response.data.link_token);
        } catch (error) {
          console.error('Error generating link token:', error);
          setPlaidError('Failed to initialize bank connection');
        }
      };
      createLinkToken();
    }
  }, [user]);

  //TODO: abstract away
  const onSuccess = async (public_token: string) => {
    try {
      const response = await axios.post<ExchangeTokenResponse>(
        '/api/plaid/exchange-token',
        {
          public_token,
          userId: user?.sub,
        }
      );

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
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
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
      <div className='p-4 text-red-500'>
        An error occurred: {authError.message}
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {/* Budget Summary Widget */}
        <div className='col-span-1 lg:col-span-1'>
          <BudgetSummary
            transactions={transactions}
            timePeriod={selectedTimePeriod}
          />
        </div>

        {/* Spending Categories Pie Chart */}
        <div className='col-span-1 lg:col-span-1'>
          <SpendingCategories
            transactions={transactions}
            timePeriod={selectedTimePeriod}
          />
        </div>

        {/* Account Balances */}
        <div className='col-span-1 lg:col-span-1'>
          <AccountBalances transactions={transactions} />
        </div>
      </div>

      {/* Spending Trends Graph */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Spending Trends</h2>
        <SpendingTrendsChart
          transactions={transactions}
          timePeriod={selectedTimePeriod}
        />
      </div>

      {/* Recent Transactions Table */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Recent Transactions</h2>
        {transactionsError ? (
          <div className='text-red-500'>{transactionsError}</div>
        ) : (
          <TransactionsTable transactions={transactions} />
        )}
      </div>
    </div>
  );
}
