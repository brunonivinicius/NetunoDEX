'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './dropdown.module.css';
import Link from 'next/link';

const Dropdown = ({ data, searchTerm }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const dropdownRef = useRef(null);

  const filteredData =
    searchTerm.trim().length > 0
      ? data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
    // Verifica se o scroll está no final
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisibleCount((prevCount) => prevCount + 10);
    }
  };

  useEffect(() => {
    const element = dropdownRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);

      // Cleanup na desmontagem do componente
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={styles.dropDownContainer}
      style={{ overflowY: 'auto', maxHeight: '300px' }}
    >
      {filteredData.length > 0 ? (
        filteredData.slice(0, visibleCount).map((item) => (
          <Link href={`/cripto/${item.symbol}`}>
            <div key={item.id} className={styles.rows}>
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
                alt={item.name}
                width={35}
                height={35}
              />
              <p>{item.name}</p>
              <p>{item.symbol}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className={styles.noResults}>Nenhum item encontrado.</div>
      )}
    </div>
  );
};

export default Dropdown;
