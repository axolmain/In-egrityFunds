import { useUser } from '@auth0/nextjs-auth0/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, UserX } from 'lucide-react';

export default function UserGreeting() {
  const { user, isLoading } = useUser();

  // Loading state
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-48'>
        <Loader2 className='animate-spin h-6 w-6 text-gray-500' />
        <span className='ml-2 text-gray-500'>Loading your profile...</span>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <Alert variant='destructive' className='max-w-md mx-auto'>
        <UserX className='h-5 w-5' />
        <AlertTitle>Not authenticated</AlertTitle>
        <AlertDescription>
          You are not currently signed in. Please log in to access the
          dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  // Authenticated state
  return (
    <div className='container mx-auto py-6'>
      <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>
        Welcome, {user.name}!
      </h1>
      {/* Other personalized dashboard content can be added here */}
    </div>
  );
}
