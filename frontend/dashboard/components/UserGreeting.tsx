// pages/UserGreeting.tsx

import { useUser } from '@auth0/nextjs-auth0/client';
import { PlaidLink } from '@/components/PlaidLink';

export default function UserGreeting() {
    const { user, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Not authenticated</div>;

    return (
        <div className="container mx-auto">
            <h1>Welcome, {user.name}!</h1>
            <PlaidLink />
            {/* Other dashboard content goes here */}
        </div>
    );
}
