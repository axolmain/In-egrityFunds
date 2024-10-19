import { FC, MouseEvent } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { usePlaidAuth } from '@/hooks/usePlaidAuth';
<<<<<<< HEAD
import {getItem} from "@/utils/indexedDB";
import {decrypt} from "@/utils/encryption";
import {useUser} from "@auth0/nextjs-auth0/client";
=======
import { Button } from '@/components/ui/button'; // Import Button from Shadcn
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Shadcn Alert for better error and success states
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'; // Icons from Lucide for visual feedback
>>>>>>> ff693ce (layout)

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
  const { open } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });
  const { user } = useUser();


  const handlePlaidClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    open();
  };

  // Use the custom hook to check if the user is already connected to Plaid
  const { plaidToken, setPlaidToken, loading } = usePlaidAuth();  // Expose `setPlaidToken`

  // Modify the onSuccess function to immediately update the state and IndexedDB
  const handleOnSuccess = async (public_token: string) => {
    await onSuccess(public_token);  // Perform the token exchange

    // Assuming `onSuccess` successfully exchanges the token and saves it in IndexedDB,
    // We now fetch the token from IndexedDB and set it manually in the state.
    const accessToken = await getItem(user?.sub!); // Retrieve the encrypted token from IndexedDB
    if (accessToken) {
      const decryptedToken = decrypt(accessToken);  // Decrypt it
      setPlaidToken(decryptedToken);  // Update the state to immediately reflect the new token
    }
  };

  // If loading, show a loading state
  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <Loader2 className='animate-spin h-5 w-5 mr-2' /> Loading...
      </div>
    );
  }

  // If the user is already connected (plaidToken exists), show a success message
  if (plaidToken) {
    return (
<<<<<<< HEAD
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Your bank account is already connected!
        </div>
=======
      <Alert>
        <CheckCircle className='h-4 w-4' />
        <AlertTitle>Bank Connected</AlertTitle>
        <AlertDescription>
          Your bank account is already connected!
        </AlertDescription>
      </Alert>
>>>>>>> ff693ce (layout)
    );
  }

  return (
<<<<<<< HEAD
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
=======
    <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
      <h2 className='text-xl font-semibold mb-4'>Bank Connection</h2>

      {/* Show error if there's a Plaid connection error */}
      {plaidError && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{plaidError}</AlertDescription>
        </Alert>
      )}

      {/* Show the Plaid connection button if linkToken is available */}
      {linkToken ? (
        <Button onClick={handlePlaidClick} disabled={!ready} className='w-full'>
          Connect Your Bank
        </Button>
      ) : (
        <div className='flex justify-center items-center'>
          <Loader2 className='animate-spin h-5 w-5 mr-2' /> Initializing...
        </div>
      )}
    </div>
>>>>>>> ff693ce (layout)
  );
};

export default PlaidConnection;
