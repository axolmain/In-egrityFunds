'use client';
import { useUser } from '@auth0/nextjs-auth0/client'; // or use NextAuth.js
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!user) {
    router.push('/api/auth/login'); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Your dashboard content goes here.</p>
    </div>
  );
}
