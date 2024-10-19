// components/financialComponents/BudgetForm.tsx
import { useState, useEffect } from 'react';

interface BudgetFormProps {
    onSubmit: (budgetData: any) => void;
    initialData?: any;
    onCancel?: () => void;
}

export default function BudgetForm({ onSubmit, initialData = {}, onCancel }: BudgetFormProps) {
    const [name, setName] = useState(initialData.name || '');
    const [amount, setAmount] = useState(initialData.amount || 0);
    const [timePeriod, setTimePeriod] = useState(initialData.timePeriod || 'monthly'); // Default to 'monthly'

    useEffect(() => {
        // Update form fields when the initialData changes
        setName(initialData.name || '');
        setAmount(initialData.amount || 0);
        setTimePeriod(initialData.timePeriod || 'monthly');
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const budgetData = { name, amount, timePeriod };
        onSubmit(budgetData);
        // Reset the form after submission
        setName('');
        setAmount(0);
        setTimePeriod('monthly');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Budget Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Groceries, Entertainment"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Budget Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter budget amount"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timePeriod">
                    Time Period
                </label>
                <select
                    id="timePeriod"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {initialData && initialData.id ? 'Update Budget' : 'Add Budget'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
