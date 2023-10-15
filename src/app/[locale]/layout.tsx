import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { notFound } from 'next/navigation';

const locales = ['en', 'pl'];

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}
