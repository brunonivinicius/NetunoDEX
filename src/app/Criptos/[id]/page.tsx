'use client';
import Header from '@/components/Header';
import Header2 from '@/components/Header2';
import React from 'react';
import { useEffect } from 'react';
import styles from './page.module.css';

type PageParams = {
  params: {
    id: string;
  };
};

interface APIResponse {
  status: Status;
  data: {
    [key: string]: Cryptocurrency[];
  };
}

interface Status {
  timestamp: string;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice: string | null;
}

interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  tagNames: string[];
  tagGroups: string[];
  urls: URLS;
  platform: string | null;
  dateAdded: string;
  twitterUsername: string;
  isHidden: number;
  dateLaunched: string;
  contractAddress: string[];
  selfReportedCirculatingSupply: number | null;
  selfReportedTags: string[] | null;
  selfReportedMarketCap: number | null;
  infiniteSupply: boolean;
  quote: {
    [key: string]: CurrencyQuote;
  };
}

interface CurrencyQuote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string;
}

interface URLS {
  website: string[];
  twitter: string[];
  messageBoard: string[];
  chat: string[];
  facebook: string[];
  explorer: string[];
  reddit: string[];
  technicalDoc: string[];
  sourceCode: string[];
  announcement: string[];
}

const CriptoPage = ({ params }: PageParams) => {
  const symbol = params.id;
  const [cripto, setCripto] = React.useState<Cryptocurrency>();
  const [criptoprice, setcriptoPrice] = React.useState<Cryptocurrency>();

  useEffect(() => {
    async function fetchMetadata() {
      const response = await fetch(
        `http://localhost:3000/api/metadata?query=${params.id}`,
      );
      const result = await response.json();
      const object: APIResponse = result.data;
      const cripto: Cryptocurrency = object.data[symbol][0];
      setCripto(cripto);
      console.log(cripto);
    }
    fetchMetadata();

    async function fetchPrice() {
      const response = await fetch(
        `http://localhost:3000/api/fetchPrice?query=${params.id}`,
      );
      const result = await response.json();
      const object: APIResponse = result.data;
      const price: Cryptocurrency = object.data[symbol][0];
      setcriptoPrice(price);
      // console.log(price);
    }
    fetchPrice();
  }, [symbol]);

  return (
    <>
      <Header />
      <Header2 />
      <div className={styles.container}>
        <div className={styles.leftElements}>
          <div>
            <img
              src={cripto?.logo}
              alt={`${cripto?.symbol} logo`}
              height={64}
              width={64}
            ></img>
            <h2>{cripto?.name}</h2>
            <p>{cripto?.symbol}</p>
          </div>
          <h1>{criptoprice?.quote.USD.price}</h1>
          <p>{criptoprice?.quote.USD.percent_change_24h}</p>
          <p>Cap. de Mercado:</p>
          <p>Volume (24h):</p>
          <p>Fornecimento em circulação:</p>
          <p>Fornecimento máximo: </p>
          <p>Fornecimento máximo: </p>
          <p>Links oficiais:</p>
          <button>Site</button>
          <button>Whitepaper</button>
          <button>GitHub</button>
        </div>
        <div className={styles.rightElements}>
          <p>{cripto?.description}</p>
        </div>
      </div>
    </>
  );
};

export default CriptoPage;
