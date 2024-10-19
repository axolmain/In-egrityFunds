import React from 'react';
import { Transaction } from '../../types/financialTypes';

interface BudgetSummaryProps {
  transactions: Transaction[];
  timePeriod: string;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  transactions,
  timePeriod,
}) => {
  // Calculate total spent
  const totalSpent: number = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalBudget: number = 2000; // This could come from user settings or API
  const remainingAmount: number = totalBudget - totalSpent;

  return (
    <div className='p-4 bg-white shadow-md rounded-md'>
      <h3 className='text-lg font-semibold mb-4'>
        Budget Summary ({timePeriod})
      </h3>
      <p>Total Budget: ${totalBudget.toFixed(2)}</p>
      <p>Amount Spent: ${totalSpent.toFixed(2)}</p>
      <p>Remaining: ${remainingAmount.toFixed(2)}</p>
      <div className='relative pt-1 mt-4'>
        <div className='overflow-hidden h-2 text-xs flex rounded bg-gray-200'>
          <div
            style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
            className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500'
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
