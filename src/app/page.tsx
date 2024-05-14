import Header from '@/components/Header';
import Header2 from '@/components/Header2';
import Janelas from '@/components/Janelas';
import TableHeader from '@/components/TableHeader';
import Table from '@/components/Table';
import Footer from '@/components/Footer';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Header2 />
        <Janelas />
        <TableHeader />
        <Table />
        <Footer />
      </ThemeProvider>
    </>
  );
}
