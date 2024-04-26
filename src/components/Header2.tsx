import React from 'react';
import styles from './header2.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Header2 = () => {
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
        <div className={styles.titleLinks}>Swap</div>
        <div className={styles.titleLinks}>Informações</div>
      </div>

      <div>
        <input className={styles.input} type="text" placeholder="Procurar.." />
      </div>
    </div>
  );
};

export default Header2;
