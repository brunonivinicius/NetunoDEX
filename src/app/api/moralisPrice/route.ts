import Moralis from "moralis";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    // Inicializa Moralis com a chave de API do ambiente
    await Moralis.start({ apiKey: process.env.MORALIS_KEY });

    try {
        const responseOne = await Moralis.EvmApi.token.getTokenPrice({
            address: query.addressOne
        });

        const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
            address: query.addressTwo
        });

        const usdPrices = {
            tokenOne: responseOne.raw.usdPrice,
            tokenTwo: responseTwo.raw.usdPrice,
            ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
        };

        return res.status(200).json(usdPrices);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}