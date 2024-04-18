import React from 'react';
import styles from './header.module.css';
import { MoonFilled, CaretDownOutlined } from '@ant-design/icons';

interface HeaderElementProps {
  text: string;
}

const HeaderElement: React.FC<HeaderElementProps> = ({ text }) => (
  <div className={styles.headerLeftElements}>{text}</div>
);

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <HeaderElement text="Criptomoedas:" />
      <HeaderElement text="Corretoras:" />
      <HeaderElement text="Capitalização de mercado:" />
      <HeaderElement text="Vol. 24H:" />
      <HeaderElement text="Domínio:" />
      <HeaderElement text="Gás:" />
      <div className={styles.headerRightElements}>
        <button className={styles.iconButton}>
          <MoonFilled />
        </button>
        <CaretDownOutlined />
        <span>PT-BR</span>
      </div>
      <button className={styles.buttonRight}>Entrar</button>
    </div>
  );
};

export default Header;
