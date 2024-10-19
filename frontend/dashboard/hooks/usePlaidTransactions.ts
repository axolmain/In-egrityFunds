import { useEffect, useState } from 'react';
import axios from 'axios';
import { getItem, setItem } from '@/utils/indexedDB'; // IndexedDB utilities

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
}

export function usePlaidTransactions(userId: string | undefined) {
    const [transactions, setTransactions] = useState<Transaction[]>([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTransactionsFromLocal() {
            if (userId) {
                const storedTransactions = await getItem(`transactions-${userId}`);
                if (storedTransactions) {
                    setTransactions(storedTransactions as Transaction[]);
                }
            }
        }

        async function fetchTransactionsFromServer() {
            try {
                if (userId) {
                    const encryptedAccessToken = await getItem(userId);
                    if (!encryptedAccessToken) {
                        setError('Access token not found in IndexedDB');
                        return;
                    }

                    // Send encrypted access token to the server via POST
                    const { data } = await axios.post<{ transactions: Transaction[] }>('/api/plaid/fetch-transactions', {
                        encryptedAccessToken,
                    });

                    // Ensure data.transactions is an array
                    if (Array.isArray(data.transactions)) {
                        setTransactions(data.transactions);
                        await setItem(`transactions-${userId}`, data.transactions);
                    } else {
                        setTransactions([]); // Fallback to an empty array if not an array
                    }
                }
            } catch (error) {
                setError('Failed to fetch transactions from server');
            } finally {
                setLoading(false);
            }
        }

        loadTransactionsFromLocal();
        fetchTransactionsFromServer();
    }, [userId]);

    return { transactions, loading, error };
}
