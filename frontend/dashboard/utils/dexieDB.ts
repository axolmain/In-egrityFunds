// utils/db.ts
import Dexie, { Table } from 'dexie';
import {Budget} from "@/types/financialTypes";

// Define the structure of the budget object


// Create a Dexie database class
class MyAppDatabase extends Dexie {
    budgets!: Table<Budget, number>; // Define a table for budgets

    constructor() {
        super('MyAppDatabase');
        this.version(1).stores({
            budgets: '++id, name, amount, spent, timePeriod', // Define the schema
        });
    }
}

// Create a singleton instance of the database
export const db = new MyAppDatabase();
