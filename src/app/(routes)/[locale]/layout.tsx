import ClientSessionProvider from '@/app/_components/providers/ClientSessionProvider/client/ClientSessionProvider';
import ReactQueryProvider from '@/app/_components/providers/ReactQueryProvider/ReactQueryProvider';
import '@/app/_styles/globals.scss';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';


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
  const session = await getServerSession();

  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        <ReactQueryProvider>
          <Theme>
            <ClientSessionProvider session={session}>
              {children}
            </ClientSessionProvider>
          </Theme>
        </ReactQueryProvider>
      </body>
    </html >
  );
}
