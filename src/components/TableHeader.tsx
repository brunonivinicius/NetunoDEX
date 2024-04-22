import React from 'react';
import styles from './tableHeader.module.css';

interface TableHeadElementProps {
  text: string;
}

const TableHead: React.FC<TableHeadElementProps> = ({ text }) => (
  <div>{text}</div>
);

const TableHeader = () => {
  return (
    <>
      {' '}
      <div className={styles.container}>
        <button className={styles.button}>Criptomoedas</button>
        <button className={styles.button}>Categorias</button>
      </div>
      <div className={styles.secondContainer}>
        <div>#</div>
        <div>Logo</div>
        <TableHead text="Nome" />
        <TableHead text="Preço" />
        <TableHead text="1H" />
        <TableHead text="2H" />
        <TableHead text="7D" />
        <TableHead text="Cap. de Mercado" />
        <TableHead text="Volume (24h)" />
        <div>Max</div>
        <TableHead text="Ultimos 7 dias" />
      </div>
    </>
  );
};

export default TableHeader;
