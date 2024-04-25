import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { symbol } = req.query; // Pega o símbolo da query URL

  try {
    const apiResponse = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}&CMC_PRO_API_KEY=${process.env.apiKey}`,
      {},
    );
    const data = await apiResponse.json();
    console.log( apiResponse )

    if (apiResponse.ok) {
      res.status(200).json({ data });
    } else {
      throw new Error(data.status.error_message || 'Error fetching data');
    }
  } catch (error) {
    res.status(500).json({ error:'Failed to fetch data' });
  }
}
