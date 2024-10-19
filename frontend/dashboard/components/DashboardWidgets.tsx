// components/DashboardWidgets.tsx
import { FC } from 'react';

const DashboardWidgets: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Account Overview</h3>
                <p className="text-gray-600">Your dashboard content goes here.</p>
            </div>
            {/* Add more widgets here as needed */}
        </div>
    );
};

export default DashboardWidgets;
