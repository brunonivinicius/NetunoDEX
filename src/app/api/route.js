export async function getCryptoFonts(chainid, address) {
  const url = `https://cryptofonts-token-icon-api1.p.rapidapi.com/${chainid}/${address}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'cryptofonts-token-icon-api1.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
