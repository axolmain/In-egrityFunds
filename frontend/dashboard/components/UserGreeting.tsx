// components/UserGreeting.tsx
import { FC } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';

interface UserGreetingProps {
    user: UserProfile;
}

const UserGreeting: FC<UserGreetingProps> = ({ user }) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-gray-600">Manage your financial dashboard</p>
        </div>
    );
};

export default UserGreeting;
