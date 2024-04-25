export async function GET() {
  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`,
    {},
  );
  const data = await res.json();

  return Response.json({ data });
}
