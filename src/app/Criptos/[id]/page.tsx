'use client';
import React from 'react';
import Header from '@/components/Header';
import Header2 from '@/components/Header2';

const CriptoPage = ({ params }) => {
  console.log(params.id);
  const [data, setData] = React.useState();
  const [symbol, setSymbol] = React.useState('BTC'); // Exemplo de inicialização com Bitcoin

  React.useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(`/api/fetchMetadata?symbol=${symbol}`);
        const result = await response.json();
        console.log('API response:', result);

        if (response.ok) {
          setData(result.data.data);
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

    fetchMetadata();
  }, [symbol]); // Dependência do useEffect para reagir a mudanças no símbolo

  return (
    <>
      <Header />
      <Header2 />
      <div>{}</div>
    </>
  );
};

export default CriptoPage;
