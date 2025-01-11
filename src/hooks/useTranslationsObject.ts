import { useTranslations } from 'next-intl';

const toUpperCaseWithUnderscores = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
};

const useTranslationsObject = (scope: string) => {
  const t = useTranslations().raw(scope);
  const translations: { [key: string]: string } = {};

  const keys = Object.keys(t);
  keys.forEach((key) => {
    const formattedKey = toUpperCaseWithUnderscores(key);
    translations[formattedKey] = t[key];
  });

  return translations;
};

export default useTranslationsObject;
