'use client';
import React from 'react';
import styles from './janelas.module.css';

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

const Janelas = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    async function fetchGlobal() {
      try {
        const response = await fetch('/api/fetchGlobal');
        const result = await response.json();

        if (response.ok) {
          setData(result.data.data); // setData(result.data.data);
          console.log(result.data.data);
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

  return (
    <>
      <h1 className={styles.title}>
        Top 100 Criptomoedas por Capitalização de Mercado
      </h1>
      <div className={styles.janelas}>
        <div className={styles.janela}>
          <h2 className={styles.titleGrade}>Tendências</h2>
          <div className={styles.info}>
            <h3 className={styles.desc}>DeFi(24h): </h3>
            <p className={styles.infoData}>
              {data && formatMarketCap(data.defi_24h_percentage_change)}%
            </p>
            <h3 className={styles.desc}>Derivatives(24h): </h3>
            <p className={styles.infoData}>
              {data && formatMarketCap(data.derivatives_24h_percentage_change)}%
            </p>
            <h3 className={styles.desc}>Stable Coin(24h)</h3>
            <p className={styles.infoData}>
              {data && formatMarketCap(data.stablecoin_24h_percentage_change)}%
            </p>
          </div>
        </div>
        <div className={styles.janela}>
          <h2 className={styles.titleGrade}>Dominance</h2>
          <div className={styles.info}>
            <h3 className={styles.desc}>BTC Dominance (24h): </h3>
            <p className={styles.infoData}>
              {data &&
                formatMarketCap(data.btc_dominance_24h_percentage_change)}
              %
            </p>
            <h3 className={styles.desc}>ETH Dominance (24h): </h3>
            <p className={styles.infoData}>
              {data &&
                formatMarketCap(data.eth_dominance_24h_percentage_change)}
              %
            </p>
          </div>
        </div>
        <div className={styles.janela}>
          {' '}
          <h2 className={styles.titleGrade}>Status</h2>
          <div className={styles.info}>
            <h3 className={styles.desc}>Total Crypto: </h3>
            <p className={styles.infoData}>
              {data && data.total_cryptocurrencies}
            </p>
            <h3 className={styles.desc}>Exchanges: </h3>
            <p className={styles.infoData}>{data && data.total_exchanges}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Janelas;
