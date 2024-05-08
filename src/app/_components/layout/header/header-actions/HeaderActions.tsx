import AccountMenu from '@/app/_components/layout/header/header-actions/account-menu/AccountMenu';
import Translations from '@/app/_types/messages/layout/header/header';
import { ROUTES } from '@/app/_types/routes';
import { Button } from '@radix-ui/themes';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './HeaderActions.module.scss';

type Props = {
  session: Session
  isMobile?: boolean
};

const HeaderActions: React.FC<Props> = ({ isMobile, session }) => {
  const t = useTranslations();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    return (
      <div className={`${styles.container} ${isMobile && styles.mobile}`}>
        <Link href={ROUTES.LOGIN_PAGE}>
          <Button variant="soft" color="indigo" size="3" className={styles.actionButton}>
            {t(Translations.LOGIN)}
          </Button>
        </Link>
        <Link href={ROUTES.REGISTER_PAGE}>
          <Button variant="soft" color="green" size="3" className={styles.actionButton}>
            {t(Translations.CREATE_ACCOUNT)}
          </Button>
        </Link>
      </div>
    );
  }

  if (isAuthenticated) {
    return <AccountMenu session={session} />;
  }
};

export default HeaderActions;
