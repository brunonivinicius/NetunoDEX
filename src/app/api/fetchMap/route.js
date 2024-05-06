export async function GET() {
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`,
    { cache: 'force-cache' },
  );
  const data = await res.json();
  return Response.json({ data });
}
