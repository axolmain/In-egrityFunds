// app/budgets/page.tsx
'use client';
import { useState } from 'react';
import BudgetForm from '@/components/financialComponents/BudgetForm';
import BudgetProgressChart from '@/components/financialComponents/BudgetProgressChart';
import BudgetList from '@/components/financialComponents/BudgetList';
import {useBudgets} from "@/hooks/UseBudgets";

export default function Budgets() {
    const { budgets, loading, error, addBudget, updateBudget, deleteBudget } = useBudgets('user-id-placeholder');
    const [selectedBudget, setSelectedBudget] = useState<any>(null); // Initializing selectedBudget as null

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
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
                />
            </div>

            {/* Progress of each budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {budgets.map((budget) => (
                    <BudgetProgressChart key={budget.id} budget={budget} />
                ))}
            </div>

            {/* List of budgets with edit and delete options */}
            <BudgetList
                budgets={budgets}
                onEdit={setSelectedBudget}
                onDelete={deleteBudget}
            />
        </div>
    );
}
