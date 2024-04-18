import React from 'react';
import styles from './janelas.module.css';

const Janelas = () => {
  return (
    <>
      <h1 className={styles.title}>
        Top 100 Criptomoedas por Capitalização de Mercado
      </h1>
      <div className={styles.janelas}>
        <div className={styles.janela}>
          <h2 className={styles.titleGrade}>Tendências</h2>
        </div>
        <div className={styles.janela}>
          <h2 className={styles.titleGrade}>Maiores Ganhos</h2>
        </div>
        <div className={styles.janela}>
          <h2 className={styles.titleGrade}>Mais Visitados</h2>
        </div>
      </div>
    </>
  );
};

export default Janelas;
