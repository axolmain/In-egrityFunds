// hooks/useBudgets.ts
import { useState, useEffect } from 'react';
import { db } from '@/utils/dexieDB';
import {Budget} from "@/types/financialTypes";

export function useBudgets(userId: string) {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all budgets from IndexedDB
    const fetchBudgets = async () => {
        try {
            setLoading(true);
            const allBudgets = await db.budgets.toArray();
            setBudgets(allBudgets);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch budgets:', err);
            setError('Failed to fetch budgets');
            setLoading(false);
        }
    };

    // Add a new budget
    const addBudget = async (newBudget: Omit<Budget, 'id'>) => {
        try {
            const id = await db.budgets.add(newBudget);
            setBudgets([...budgets, { ...newBudget, id }]);
        } catch (err) {
            console.error('Failed to add budget:', err);
            setError('Failed to add budget');
        }
    };

    // Update an existing budget
    const updateBudget = async (updatedBudget: Budget) => {
        try {
            await db.budgets.put(updatedBudget);
            setBudgets(
                budgets.map((budget) =>
                    budget.id === updatedBudget.id ? updatedBudget : budget
                )
            );
        } catch (err) {
            console.error('Failed to update budget:', err);
            setError('Failed to update budget');
        }
    };

    // Delete a budget
    const deleteBudget = async (id: number) => {
        try {
            await db.budgets.delete(id);
            setBudgets(budgets.filter((budget) => budget.id !== id));
        } catch (err) {
            console.error('Failed to delete budget:', err);
            setError('Failed to delete budget');
        }
    };

    // Fetch budgets when the component is mounted or userId changes
    useEffect(() => {
        fetchBudgets();
    }, [userId]);

    return {
        budgets,
        loading,
        error,
        addBudget,
        updateBudget,
        deleteBudget,
    };
}
