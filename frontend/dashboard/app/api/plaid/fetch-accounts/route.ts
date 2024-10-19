import { NextRequest, NextResponse } from 'next/server';
import {AccountsGetResponse, Configuration, PlaidApi, PlaidEnvironments} from 'plaid';
import {useUser} from "@auth0/nextjs-auth0/client";
import {getItem} from "@/utils/indexedDB";
import {decrypt} from "@/utils/encryption";

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

export async function GET(req: NextRequest) {
    try {
        const { user } = useUser();
        if (user?.sub) {
            const encryptedToken: any = await getItem(user.sub);
            const access_token = decrypt(encryptedToken);
            const response = await client.accountsGet({
                access_token,
            });

            return NextResponse.json({transactions: response.data.accounts});
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}