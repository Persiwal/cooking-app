import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main style={{ height: '80vh' }}>{children}</main>
      <Footer />
    </>
  );
}
