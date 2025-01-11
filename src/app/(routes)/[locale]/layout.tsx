import ClientSessionProvider from '@/components/providers/client-session-provider/ClientSessionProvider';
import NotificationsProvider from '@/components/providers/notifications-provider/NotificationsProvider';
import ReactQueryProvider from '@/components/providers/react-query-provider/ReactQueryProvider';
import { routing } from '@/libs/i18n/routing';
import '@/styles/globals.scss';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { getServerSession } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  const session = await getServerSession();

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

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
