import {Budget} from "@/types/financialTypes";

interface BudgetProgressChartProps {
    budget: Budget
}

export default function BudgetProgressChart({ budget }: BudgetProgressChartProps) {
    const { name, amount, spent } = budget;
    const progress = Math.min((spent / amount) * 100, 100);

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <div className="relative h-6 bg-gray-200 rounded-full">
                <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
                <span>Spent: ${spent.toFixed(2)}</span>
                <span>Budget: ${amount.toFixed(2)}</span>
            </div>
        </div>
    );
}