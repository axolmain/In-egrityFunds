// app/api/plaid/fetch-transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { decrypt } from '@/utils/encryption';

const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
            'PLAID-SECRET': process.env.PLAID_SECRET || '',
        },
    },
});
const client = new PlaidApi(config);

export async function POST(req: NextRequest) {
    try {
        const { encryptedAccessToken } = await req.json(); // Expecting encrypted token from the client
        if (!encryptedAccessToken) {
            return NextResponse.json({ error: 'Missing access token' }, { status: 400 });
        }

        // Decrypt the access token
        const access_token = decrypt(encryptedAccessToken);
        console.log(access_token)
        // Call Plaid's transaction sync endpoint
        const response = await client.transactionsSync({
            access_token,
        });

        // Return the newly added transactions
        return NextResponse.json({ transactions: response.data.added });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}
