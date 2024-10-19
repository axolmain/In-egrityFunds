'use client';
import { useState, useEffect } from 'react';
import BudgetProgressChart from '@/components/financialComponents/BudgetProgressChart';
import BudgetList from '@/components/financialComponents/BudgetList';
import { useBudgets } from '@/hooks/UseBudgets';
import { BudgetForm } from '@/components/financialComponents/BudgetForm';
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePlaidTransactions } from '@/hooks/usePlaidTransactions';

export default function Budgets() {
    const { budgets, loading, error, addBudget, updateBudget, deleteBudget } = useBudgets('user-id-placeholder');
    const [selectedBudget, setSelectedBudget] = useState<any>(null);
    const { user } = useUser();

    // Fetch user transactions from Plaid
    const { transactions, loading: transactionsLoading, error: transactionsError } = usePlaidTransactions(user?.sub || '');

    // State to store category progress
    const [categoryProgress, setCategoryProgress] = useState<{ [category: string]: number }>({});

    useEffect(() => {
        if (transactions && transactions.length > 0) {
            const categorySums: { [category: string]: number } = {};

            transactions.forEach((transaction) => {
                const category = transaction.category[0]; // Assuming category[0] is the primary category
                const amount = transaction.amount;

                // Initialize category if it doesn't exist
                if (!categorySums[category]) {
                    categorySums[category] = 0;
                }

                // Add transaction amount to the corresponding category
                categorySums[category] += amount;
            });

            setCategoryProgress(categorySums); // Update the state with calculated category progress
        }
    }, [transactions]);

    if (loading || transactionsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error || transactionsError) {
        return <div className="text-red-500">{error || transactionsError}</div>;
    }

    // Handle adding or updating a budget
    const handleSubmitBudget = (budgetData: any) => {
        if (selectedBudget) {
            updateBudget({ ...selectedBudget, ...budgetData });
            setSelectedBudget(null); // Reset the selected budget after updating
        } else {
            addBudget(budgetData);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Your Budgets</h1>

            {/* Budget Form for adding/updating budgets */}
            <div className="mb-8">
                <BudgetForm
                    onSubmit={handleSubmitBudget}
                    initialData={selectedBudget || undefined}
                    onCancel={() => setSelectedBudget(null)}
                    user={user}
                />
            </div>

            {/* Progress of each budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {budgets.map((budget) => (
                    <BudgetProgressChart
                        key={budget.id}
                        budget={budget}
                        categoryProgress={categoryProgress[budget.spendingCategories] || 0} // Pass category progress value
                    />
                ))}
            </div>

            {/* Budget List with edit and delete options */}
            {/* Uncomment if needed */}
            {/* <BudgetList
                budgets={budgets}
                onEdit={setSelectedBudget}
                onDelete={deleteBudget}
            /> */}
        </div>
    );
}
