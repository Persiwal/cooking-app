import ClientSessionProvider from '@/app/_components/providers/client-session-provider/ClientSessionProvider';
import NotificationsProvider from '@/app/_components/providers/notifications-provider/NotificationsProvider';
import ReactQueryProvider from '@/app/_components/providers/react-query-provider/ReactQueryProvider';
import '@/app/_styles/globals.scss';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { getServerSession } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
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

  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ReactQueryProvider>
          <Theme>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ClientSessionProvider session={session}>
                {children}
                <NotificationsProvider />
              </ClientSessionProvider>
            </NextIntlClientProvider>
          </Theme>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
