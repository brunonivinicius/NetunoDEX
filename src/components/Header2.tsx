'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './header2.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from './Dropdown';

const Header2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/fetchMap');
      const result = await response.json();
      const items = result.data.data;
      setData(items);
    }
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftElements}>
        <Link href="/">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </Link>
        <Link href="/cripto">
          <div className={styles.titleLinks}>Criptomoedas</div>
        </Link>
        <Link href="/swap">
          <div className={styles.titleLinks}>Swap</div>
        </Link>
        <div className={styles.titleLinks}>Informações</div>
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Procurar.."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm.trim().length > 0 && (
          <Dropdown data={data} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};

export default Header2;
