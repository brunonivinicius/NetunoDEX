import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${query}&CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`,
    {},
  );
  const data = await res.json();
  return Response.json({ data });
}