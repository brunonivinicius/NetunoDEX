'use client';
import React from 'react';
import styles from './table.module.css';

interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

interface QuoteUSD {
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
  tvl: null | number;
  last_updated: string;
}

interface CryptoQuote {
  USD: QuoteUSD;
}

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[]; // adicionado para refletir dados reais
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: Platform | null; // atualizado para aceitar um objeto ou null
  cmc_rank: number;
  self_reported_circulating_supply: null | number;
  self_reported_market_cap: null | number;
  tvl_ratio: null | number;
  last_updated: string;
  quote: CryptoQuote;
}

interface CriptoProps {
  cmc_rank: number;
  name: string;
  symbol: string;
  quote: CryptoQuote;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
  max_supply: number | null;
  iconUrl: string;
}

function getClassForValue(value: any) {
  return value < 0 ? styles.textNegative : styles.textNormal;
}

function formatMarketCap(value: number) {
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

const Cripto: React.FC<CriptoProps> = ({
  cmc_rank,
  name,
  symbol,
  quote,
  percent_change_1h,
  percent_change_24h,
  percent_change_7d,
  market_cap,
  volume_24h,
  max_supply,
  iconUrl,
}) => {
  return (
    <div className={styles.cryptoContainer}>
      <p>{cmc_rank}</p>
      <img
        src={iconUrl}
        alt={`${name} logo`}
        height={38}
        width={38}
        className={styles.img}
      ></img>
      <p>
        {name} ({symbol})
      </p>
      <p>${quote.USD.price.toFixed(2)}</p>
      <p className={getClassForValue(percent_change_1h)}>
        {percent_change_1h.toFixed(2)}%
      </p>
      <p className={getClassForValue(percent_change_24h)}>
        {percent_change_24h.toFixed(2)}%
      </p>
      <p className={getClassForValue(percent_change_7d)}>
        {percent_change_7d.toFixed(2)}%
      </p>
      <p>{formatMarketCap(market_cap)}</p>
      <p>{formatMarketCap(volume_24h)}</p>
      <p>{max_supply !== null ? formatMarketCap(max_supply) : ''}</p>
    </div>
  );
};

const Table: React.FC = () => {
  const [data, setData] = React.useState<CryptoData[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      // Ajuste o endpoint conforme a rota configurada no Next.js
      const response = await fetch('/api/fetchData');
      const result = await response.json();
      setData(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <section>
      {data.map((ativo: CryptoData) => {
        return (
          <Cripto
            key={ativo.name}
            cmc_rank={ativo.cmc_rank}
            name={ativo.name}
            symbol={ativo.symbol}
            quote={ativo.quote}
            percent_change_1h={ativo.quote.USD.percent_change_1h}
            percent_change_24h={ativo.quote.USD.percent_change_24h}
            percent_change_7d={ativo.quote.USD.percent_change_7d}
            volume_24h={ativo.quote.USD.volume_24h}
            market_cap={ativo.quote.USD.market_cap}
            max_supply={ativo.max_supply}
            iconUrl={`https://s2.coinmarketcap.com/static/img/coins/64x64/${ativo.id}.png`}
          />
        );
      })}
    </section>
  );
};

export default Table;
