'use client';
import { FC, MouseEvent, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { usePlaidAuth } from '@/hooks/usePlaidAuth';
import { getItem } from '@/utils/indexedDB';
import { decrypt } from '@/utils/encryption';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface PlaidConnectionProps {
  linkToken: string | null;
  onSuccess: (public_token: string) => Promise<void>;
  plaidError: string | null;
  ready: boolean;
}

const PlaidConnection: FC<PlaidConnectionProps> = ({
  linkToken,
  onSuccess,
  plaidError,
  ready,
}) => {
  const { toast } = useToast();
  const { user } = useUser();

  const { plaidToken, setPlaidToken, loading } = usePlaidAuth();

  useEffect(() => {
    if (plaidToken) {
      toast({
        variant: 'success',
        title: 'Bank Connected',
        description: 'Your bank account has been successfully connected.',
      });
    } else if (plaidError) {
      toast({
        title: 'Connection Error',
        description: 'Could not connect to the bank.',
        variant: 'destructive',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    }
  }, [plaidToken, plaidError, toast]);

  const handleOnSuccess = async (public_token: string) => {
    try {
      await onSuccess(public_token);

      const accessToken = await getItem(user?.sub!);
      if (accessToken) {
        const decryptedToken = decrypt(accessToken);
        setPlaidToken(decryptedToken);

        toast({
          title: 'Bank Connected',
          description: 'Your bank account has been successfully connected.',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Could not connect to the bank.',
        variant: 'destructive',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    }
  };

  const { open } = usePlaidLink({
    token: linkToken!,
    onSuccess: handleOnSuccess,
  });

  const handlePlaidClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    open();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Do not render anything if the bank is already connected
  if (plaidToken) {
    return null;
  }

  return linkToken ? (
    <button
      onClick={handlePlaidClick}
      disabled={!ready}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
    >
      Connect Your Bank
    </button>
  ) : (
    <div>Loading...</div>
  );
};

export default PlaidConnection;
