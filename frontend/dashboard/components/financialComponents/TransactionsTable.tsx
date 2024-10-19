// components/TransactionsTable.tsx
interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
}

interface TransactionsTableProps {
    transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
    if (transactions.length === 0) {
        return <div>No transactions found.</div>; // Handle empty array case
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Amount</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={`${transaction.date}_${transaction.name}`}>
                        <td className="border px-4 py-2">{transaction.date}</td>
                        <td className="border px-4 py-2">{transaction.name}</td>
                        <td className="border px-4 py-2">${transaction.amount.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
