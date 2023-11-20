import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  console.log(t);

  return <>{t('title')}</>;
}
