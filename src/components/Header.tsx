import React from 'react'
import styles from './header.module.css';
import { MoonFilled } from '@ant-design/icons';

const Header = () => {
  return (
  <div className={styles.headerContainer}>
      <div className={styles.headerLeftElements}>Criptomoedas: </div>
      <div className={styles.headerLeftElements}>Corretoras: </div>
      <div className={styles.headerLeftElements}>Capitalização de mercado: </div>
      <div className={styles.headerLeftElements}>Vol. 24H: </div>
      <div className={styles.headerLeftElements}>Domínio: </div>
      <div className={styles.headerLeftElements} >Gás: </div>
      <button className={styles.headerRightElements} style={{ border: 'none', backgroundColor: 'transparent' }}>
        <MoonFilled style={{ fontSize: '16px', color: '#001342' }}/>
      </button>
  </div>
    
  )
}

export default Header