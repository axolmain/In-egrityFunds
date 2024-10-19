import Dexie, { Table } from 'dexie';

// Define your transaction structure
export interface Transaction {
    id?: string;  // Optional since Dexie might generate it
    date: string;
    amount: number;
    description: string;
    category: string;
}

// Helper class for transactions
export class TransactionClass implements Transaction {
    id?: string;
    date: string;
    amount: number;
    description: string;
    category: string;

    constructor(
        date: string,
        amount: number,
        description: string,
        category: string,
        id?: string,
    ) {
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.category = category;
        if (id) this.id = id;
    }

    // Add methods for encryption/decryption if necessary
    encrypt(): TransactionClass {
        // Add encryption logic here
        return this;
    }

    decrypt(): TransactionClass {
        // Add decryption logic here
        return this;
    }
}

// Create a new Dexie database
export class AppDB extends Dexie {
    transactions!: Table<Transaction, string>;

    public constructor() {
        super('AppDB');

        // Define the stores (tables) and schema
        this.version(1).stores({
            transactions: '++id, date, amount, description, category' // '++id' for auto-increment
        });

        // Map the transactions table to the Transaction class
        this.transactions.mapToClass(TransactionClass);
    }
}

// Instantiate the database
export const db = new AppDB();