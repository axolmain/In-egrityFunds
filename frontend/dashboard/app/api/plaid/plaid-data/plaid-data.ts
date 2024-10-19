// pages/api/plaid-data.ts

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getItem } from "@/utils/indexedDB";
import { decrypt } from "@/utils/encryption";
import type { NextApiRequest, NextApiResponse } from 'next';

// Define a type for your response data
type ResponseData = {
  error?: string;
  // Add other response data types here
};

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const session = await getSession(req, res);
    const userId = session?.user.sub;

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const encryptedToken = await getItem(userId);
    if (!encryptedToken) {
        return res.status(403).json({ error: 'Plaid not connected' });
    }

    const plaidToken = decrypt(encryptedToken);

    // Use plaidToken to fetch data from Plaid API
    // Fetch Plaid data logic goes here

    res.status(200).json({ /* Plaid data */ });
});
