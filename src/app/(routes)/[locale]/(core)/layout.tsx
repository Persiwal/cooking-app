import Header from '@/app/_components/ui/Header/Header';

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
