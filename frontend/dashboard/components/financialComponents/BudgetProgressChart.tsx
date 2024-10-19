import { Budget } from '@/types/financialTypes';

interface BudgetProgressChartProps {
  budget: Budget;
  categoryProgress: number; // Add categoryProgress prop
}

export default function BudgetProgressChart({
  budget,
  categoryProgress,
}: BudgetProgressChartProps) {
  const { name, amount } = budget;

  // Use categoryProgress to calculate the spent value
  const spent = categoryProgress;
  const progress = Math.min((spent / amount) * 100, 100); // Ensure progress is capped at 100%

  // Determine bar color: green if within budget, red if over budget
  const barColor = spent > amount ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className='p-4 bg-white shadow-md rounded'>
      <h3 className='text-lg font-semibold mb-2'>{name}</h3>
      <div className='relative h-6 bg-gray-200 rounded-full'>
        <div
          className={`absolute top-0 left-0 h-full ${barColor} rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className='flex justify-between mt-2 text-sm'>
        <span>Spent: ${spent.toFixed(2)}</span>
        <span>Budget: ${amount.toFixed(2)}</span>
      </div>
    </div>
  );
}
