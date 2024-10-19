// components/TransactionsTable.tsx
<<<<<<< HEAD

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
    if (transactions.length === 0) {
        return <div>No transactions found.</div>;
    }

    return (
        <Table className="min-w-full bg-white shadow-md rounded">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TableRow key={transaction.transaction_id}>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                            {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
=======
interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  if (transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Date</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className='border px-4 py-2'>{transaction.date}</td>
              <td className='border px-4 py-2'>{transaction.name}</td>
              <td className='border px-4 py-2'>
                ${transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
>>>>>>> ff693ce (layout)
