export async function GET() {
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=CMC_PRO_API_KEY=${process.env.apiKey}`,
    { cache: 'no-store' },
  );
  const data = await res.json();

  return Response.json({ data });
}
