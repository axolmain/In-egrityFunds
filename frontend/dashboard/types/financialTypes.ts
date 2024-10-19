import {UserProfile} from "@auth0/nextjs-auth0/client";

export interface Transaction {
    account_id: string;
    account_owner: string | null;
    amount: number;
    authorized_date: string | null;
    authorized_datetime: string | null;
    category: string[];
    category_id: string;
    check_number: string | null;
    counterparties: {
        confidence_level: string;
        entity_id: string;
        logo_url: string;
        name: string;
        phone_number: string | null;
        type: string;
        website: string | null;
    }[];
    date: string;
    datetime: string | null;
    iso_currency_code: string;
    location: {
        address: string | null;
        city: string | null;
        country: string | null;
        lat: number | null;
        lon: number | null;
        postal_code: string | null;
        region: string | null;
        store_number: string | null;
    };
    logo_url: string | null;
    merchant_entity_id: string | null;
    merchant_name: string | null;
    name: string;
    payment_channel: string;
    payment_meta: {
        by_order_of: string | null;
        payee: string | null;
        payer: string | null;
        payment_method: string | null;
        payment_processor: string | null;
        ppd_id: string | null;
        reason: string | null;
        reference_number: string | null;
    };
    pending: boolean;
    pending_transaction_id: string | null;
    personal_finance_category: {
        confidence_level: string;
        detailed: string;
        primary: string;
    };
    personal_finance_category_icon_url: string | null;
    transaction_code: string | null;
    transaction_id: string;
    transaction_type: string;
    unofficial_currency_code: string | null;
    website: string | null;
}

export interface PlaidAuth {
    userId: string;
    value: Transaction[];
}

export interface TransactionsTableProps {
    transactions: Transaction[];
}

export interface Budget {
    id?: number;
    name: string;
    amount: number;
    spendingCategories: string;
    spent: 0;
    timePeriod: 'monthly' | 'weekly' | 'yearly';
}

export interface BudgetFormProps {
    onSubmit: (budgetData: Budget) => void;
    initialData?: Partial<Budget>;
    onCancel?: () => void;
    user: any;
}