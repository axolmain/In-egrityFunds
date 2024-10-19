// app/connections/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import PlaidConnection from '@/components/PlaidConnection';
import { getItem } from '@/utils/indexedDB';
import { decrypt } from '@/utils/encryption';
import { usePlaidAuth } from '@/hooks/usePlaidAuth';
import { Button } from '@/components/ui/button'; // Assuming you're using a Button component from your UI library

interface BankAccount {
  name: string;
  institution_id: string;
  account_type: string;
}

export default function ConnectionsPage() {
  const { user, isLoading } = useUser();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [plaidError, setPlaidError] = useState<string | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<BankAccount[]>([]);
  const { plaidToken } = usePlaidAuth();
  const [showPlaidConnection, setShowPlaidConnection] = useState(false); // State to toggle the Plaid connection

  // Fetch previously connected accounts (dummy implementation)
  const fetchConnectedAccounts = async () => {
    try {
      const encryptedToken = await getItem(user?.sub!);
      if (encryptedToken) {
        const decryptedToken = decrypt(encryptedToken);
        const response = await axios.post('/api/plaid/accounts', {
          access_token: decryptedToken,
        });
        setConnectedAccounts(response.data.accounts);
      }
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
      setPlaidError('Could not retrieve connected bank accounts');
    }
  };

  useEffect(() => {
    if (user) {
      const createLinkToken = async () => {
        try {
          const response = await axios.post('/api/plaid/create-link-token', {
            client_user_id: user.sub,
          });
          setLinkToken(response.data.link_token);
        } catch (error) {
          console.error('Error generating link token:', error);
          setPlaidError('Failed to initialize bank connection');
        }
      };

      createLinkToken();
      fetchConnectedAccounts();
    }
  }, [user]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Bank Connections</h1>

      {/* Add Bank Button */}
      <Button
        onClick={() => setShowPlaidConnection(true)} // Show the Plaid connection form
        className=' px-4 py-2 rounded mb-6'
      >
        Add Bank
      </Button>

      {/* Display the Plaid Connection only when user clicks 'Add Bank' */}
      {showPlaidConnection && (
        <PlaidConnection
          linkToken={linkToken}
          onSuccess={() => fetchConnectedAccounts()}
          plaidError={plaidError}
          ready={Boolean(linkToken)}
        />
      )}

      {/* Connected Banks Section */}
      <div className='mt-8'>
        <h2 className='text-lg font-semibold mb-4'>Connected Banks</h2>
        {connectedAccounts.length > 0 ? (
          <ul className='bg-white rounded-lg shadow-md p-6'>
            {connectedAccounts.map((account, index) => (
              <li key={index} className='border-b py-2'>
                <p className='text-md font-bold'>{account.name}</p>
                <p className='text-sm text-gray-600'>
                  Type: {account.account_type}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No connected accounts found.</p>
        )}
      </div>
    </div>
  );
}
