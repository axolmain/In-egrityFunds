import { Transaction } from 'plaid';
import React from 'react';

interface AccountBalancesProps {
  transactions: Transaction[];
}

const AccountBalances: React.FC<AccountBalancesProps> = ({ transactions }) => {
  // Aggregate the balances by account_id
  const accountBalances = transactions.reduce(
    (acc: any, transaction: Transaction) => {
      if (acc[transaction.account_id]) {
        acc[transaction.account_id] += transaction.amount;
      } else {
        acc[transaction.account_id] = transaction.amount;
      }
      return acc;
    },
    {}
  );

  return (
    <div className='p-4 bg-white shadow-md rounded-md'>
      <h3 className='text-lg font-semibold mb-4'>Account Balances</h3>
      <ul>
        {Object.keys(accountBalances).map((accountId, index) => (
          <li key={index} className='mb-2'>
            <p className='font-medium'>Account ID: {accountId}</p>
            <p
              className={`${
                accountBalances[accountId] < 0
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}
            >
              ${accountBalances[accountId].toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountBalances;
