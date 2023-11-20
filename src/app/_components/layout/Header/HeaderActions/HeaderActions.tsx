import AccountMenu from '@/app/_components/layout/Header/HeaderActions/AccountMenu/AccountMenu';
import Translations from '@/app/_types/messages/layout/header/header';
import { ROUTES } from '@/app/_types/routes';
import { Button } from '@radix-ui/themes';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './HeaderActions.module.scss';

type Props = {
  type: 'unauthenticated' | 'authenticated';
  session: Session;
};

const HeaderActions: React.FC<Props> = ({ type, session }) => {
  const t = useTranslations();

  if (type === 'unauthenticated') {
    return (
      <div className={styles.container}>
        <Link href={ROUTES.LOGIN_PAGE}>
          <Button variant="soft" color="indigo" size="3">
            {t(Translations.LOGIN)}
          </Button>
        </Link>
        <Link href={ROUTES.REGISTER_PAGE}>
          <Button variant="soft" color="green" size="3">
            {t(Translations.CREATE_ACCOUNT)}
          </Button>
        </Link>
      </div>
    );
  }

  if (type === 'authenticated') {
    return <AccountMenu />;
  }
};

export default HeaderActions;
