// components/TransactionsTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {TransactionsTableProps} from "@/types/financialTypes";

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  if (transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <Table className='min-w-full bg-white shadow-md rounded'>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.transaction_id}>
            <TableCell>{transaction.name}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell
              className={
                transaction.amount > 0 ? 'text-red-600' : 'text-green-600'
              }
            >
              {transaction.amount < 0 ? '' : '-'}$
              {Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              {new Date(transaction.date).toLocaleDateString()}
            </TableCell>
            <TableCell>{transaction.transaction_type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
