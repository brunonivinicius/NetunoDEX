'use client';
import React from 'react';
import Header from '@/components/Header';
import Header2 from '@/components/Header2';
import styles from './criptos.module.css';

const Criptos = () => {
  const [data, setData] = React.useState<Array>();

  React.useEffect(() => {
    async function fetchMap() {
      // Ajuste o endpoint conforme a rota configurada no Next.js
      const response = await fetch('/api/fetchMap');
      const result = await response.json();
      const firstTenItems = result.data.data.slice(0, 500);
      setData(firstTenItems);
      console.log(result);
    }
    fetchMap();
  }, []);

  return (
    <>
      <Header />
      <Header2 />
      <div className={styles.container}>
        {data &&
          data.map((ativo: any) => {
            return (
              <div key={ativo.id} className={styles.janela}>
                {' '}
                {/* Adicionado key aqui */}
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${ativo.id}.png`}
                  alt={ativo.name} // Adicionado alt para acessibilidade
                  width={64}
                />
                <h3>{ativo.name}</h3>
                <p>{ativo.symbol}</p>
                <p># {ativo.rank}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Criptos;
