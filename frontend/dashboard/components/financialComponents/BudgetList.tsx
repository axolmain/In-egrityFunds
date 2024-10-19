// components/financialComponents/BudgetList.tsx
import {Budget} from "@/types/financialTypes";

interface BudgetListProps {
    budgets: Budget[];
    onEdit: (budget: any) => void;
    onDelete: (id: number) => void;
}

export default function BudgetList({ budgets, onEdit , onDelete}: BudgetListProps) {
    return (
        <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Your Budgets</h3>
    <ul>
    {budgets.map((budget) => (
        <li key={budget.id} className="mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-lg font-bold">{budget.name}</h4>
                    <p>
                        Spent: ${budget.spent.toFixed(2)} / Budget: ${budget.amount.toFixed(2)}
                    </p>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    onClick={() => onEdit(budget)}
                >
                    Edit
                </button>
                {typeof budget.id === 'number' && (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
                        onClick={() => onDelete(budget.id!)}
                    >
                        Delete
                    </button>
                )}
            </div>
        </li>

    ))}
    </ul>
        </div>
    );
}
