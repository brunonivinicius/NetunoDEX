'use client';
import React from 'react';
import styles from './header.module.css';
import { MoonFilled, CaretDownOutlined } from '@ant-design/icons';

interface ApiResponse {
  status: Status;
  data: Data;
  last_updated: string;
}

interface Status {
  timestamp: string;
  error_code: number;
  error_message: null | string;
  elapsed: number;
  credit_count: number;
  notice: null | string;
}

interface Data {
  active_cryptocurrencies: number;
  total_cryptocurrencies: number;
  active_market_pairs: number;
  active_exchanges: number;
  total_exchanges: number;
  eth_dominance: number;
  btc_dominance: number;
  eth_dominance_yesterday: number;
  btc_dominance_yesterday: number;
  eth_dominance_24h_percentage_change: number;
  btc_dominance_24h_percentage_change: number;
  defi_volume_24h: number;
  defi_volume_24h_reported: number;
  defi_market_cap: number;
  defi_24h_percentage_change: number;
  stablecoin_volume_24h: number;
  stablecoin_volume_24h_reported: number;
  stablecoin_market_cap: number;
  stablecoin_24h_percentage_change: number;
  derivatives_volume_24h: number;
  derivatives_volume_24h_reported: number;
  derivatives_24h_percentage_change: number;
  quote: Quote;
}

interface Quote {
  USD: CurrencyData;
}

interface CurrencyData {
  total_market_cap: number;
  total_volume_24h: number;
  total_volume_24h_reported: number;
  altcoin_volume_24h: number;
  altcoin_volume_24h_reported: number;
  altcoin_market_cap: number;
  defi_volume_24h: number;
  defi_volume_24h_reported: number;
  defi_24h_percentage_change: number;
  defi_market_cap: number;
  stablecoin_volume_24h: number;
  stablecoin_volume_24h_reported: number;
  stablecoin_24h_percentage_change: number;
  stablecoin_market_cap: number;
  derivatives_volume_24h: number;
  derivatives_volume_24h_reported: number;
  derivatives_24h_percentage_change: number;
  total_market_cap_yesterday: number;
  total_volume_24h_yesterday: number;
  total_market_cap_yesterday_percentage_change: number;
  total_volume_24h_yesterday_percentage_change: number;
  last_updated: string;
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

interface HeaderElementProps {
  text: string;
}

const HeaderElement: React.FC<HeaderElementProps> = ({ text }) => (
  <div className={styles.headerLeftElements}>{text}</div>
);

const Header: React.FC = () => {
  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    async function fetchGlobal() {
      try {
        const response = await fetch('/api/fetchGlobal');
        const result = await response.json();

        if (response.ok) {
          setData(result.data.data); // setData(result.data.data);
        } else {
          throw new Error(
            result.status.error_message ||
              'An error occurred while fetching data',
          );
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch global data:', message);
      }
    }

    fetchGlobal();
  }, []);

  if (!data) {
    return <div className={styles.headerContainer}>Carregando...</div>;
  }

  return (
    <div className={styles.headerContainer}>
      <HeaderElement text="Criptomoedas:" />
      <p className={styles.dataGlobal}>{data.active_cryptocurrencies}</p>
      <HeaderElement text="Corretoras:" />
      <div className={styles.dataGlobal}>{data.total_exchanges}</div>
      <HeaderElement text="Capitalização de mercado:" />
      <p className={styles.dataGlobal}>
        {data.quote && formatMarketCap(data.quote.USD.total_market_cap)}
      </p>
      <HeaderElement text="Vol. 24H:" />
      <p className={styles.dataGlobal}>
        {data.quote && formatMarketCap(data.quote.USD.total_volume_24h)}
      </p>
      <HeaderElement text="Domínio:" />
      <p className={styles.dataGlobal}>BTC: {data.btc_dominance.toFixed(2)}%</p>
      <p className={styles.dataGlobal}>ETH: {data.eth_dominance.toFixed(2)}%</p>
      <HeaderElement text="Gás:" />
      <div className={styles.headerRightElements}>
        <button className={styles.iconButton}>
          <MoonFilled />
        </button>
        <CaretDownOutlined />
        <span>PT-BR</span>
      </div>
      <button className={styles.buttonRight}>Conectar</button>
    </div>
  );
};

export default Header;
