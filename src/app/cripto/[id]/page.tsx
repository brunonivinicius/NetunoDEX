'use client';
import Header from '@/components/Header';
import Header2 from '@/components/Header2';
import Footer from '@/components/Footer';
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
  max_supply: number;
  total_supply: number;
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
  technical_doc: string[];
  source_code: string[];
  announcement: string[];
}

function formatMarketCap(value: number | null) {
  if (value === null) {
    return null;
  }

  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)} T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)} B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)} M`;
  } else {
    return `${value.toFixed(2)}`;
  }
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
      // console.log(cripto);
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
          <div className={styles.title}>
            <img
              src={cripto?.logo}
              alt={`${cripto?.symbol} logo`}
              height={64}
              width={64}
            ></img>
            <div className={styles.nameContainer}>
              <h2 className={styles.name}>{cripto?.name}</h2>
              <p>{cripto?.symbol}</p>
            </div>
          </div>
          <div className={styles.priceContainer}>
            <h1 className={styles.price}>
              US$ {criptoprice && formatMarketCap(criptoprice.quote.USD.price)}
            </h1>
            <p>
              {criptoprice &&
                formatMarketCap(criptoprice.quote.USD.percent_change_24h)}
            </p>
          </div>
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitle}>Cap. de Mercado:</p>
            <p>
              {criptoprice && formatMarketCap(criptoprice.quote.USD.market_cap)}
            </p>
          </div>
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitle}>Volume (24h):</p>
            <p>
              {criptoprice && formatMarketCap(criptoprice.quote.USD.volume_24h)}
            </p>
          </div>
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitle}>Fornecimento em circulação:</p>
            <p>
              {criptoprice && formatMarketCap(criptoprice.total_supply)}{' '}
              {cripto?.symbol}
            </p>
          </div>
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitle}>Fornecimento máximo: </p>
            <p>
              {criptoprice && formatMarketCap(criptoprice.max_supply)}{' '}
              {cripto?.symbol}
            </p>
          </div>
          <p className={styles.subtitle}>Links oficiais:</p>
          <div className={styles.buttonContainer}>
            <a href={cripto?.urls.website[0]}>
              <button className={styles.button}>Site</button>
            </a>
            <a href={cripto?.urls.technical_doc[0]}>
              <button className={styles.button}>Whitepaper</button>
            </a>
            <a href={cripto?.urls.source_code[0]}>
              <button className={styles.button}>Github</button>
            </a>
            <a href={cripto?.urls.twitter[0]}>
              <button className={styles.button}>X</button>
            </a>
          </div>
        </div>
        <div className={styles.rightElements}>
          <p>{cripto?.description}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CriptoPage;
