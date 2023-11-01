import ClientSessionProvider from '@/app/_components/providers/ClientSessionProvider/client/ClientSessionProvider';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Header from './_components/header';

const locales = ['en', 'pl'];

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const session = await getServerSession()

  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        <Theme>
          <ClientSessionProvider session={session}>
            <Header />
            {children}
          </ClientSessionProvider>
        </Theme>
      </body>
    </html>
  );
}
