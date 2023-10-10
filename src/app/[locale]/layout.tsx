import { notFound } from 'next/navigation';

const locales = ['en', 'pl'];

export type TLocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function LocaleLayout({
  children,
  params: { locale },
}: TLocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
