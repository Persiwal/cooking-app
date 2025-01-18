import useTranslationsObject from '@/hooks/useTranslationsObject';
import { ROUTES } from '@/types/routes';
import { Button } from '@radix-ui/themes';
import { Session } from 'next-auth';
import Link from 'next/link';
import AccountMenu from './account-menu/AccountMenu';
import styles from './HeaderActions.module.scss';

type Props = {
  session: Session;
  isMobile?: boolean;
};

const HeaderActions: React.FC<Props> = ({ isMobile, session }) => {
  const t = useTranslationsObject('layout');
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    return (
      <div className={`${styles.container} ${isMobile && styles.mobile}`}>
        <Link href={ROUTES.LOGIN_PAGE}>
          <Button
            variant="soft"
            color="indigo"
            size="3"
            className={styles.actionButton}
          >
            {t.LOGIN}
          </Button>
        </Link>
        <Link href={ROUTES.REGISTER_PAGE}>
          <Button
            variant="soft"
            color="green"
            size="3"
            className={styles.actionButton}
          >
            {t.CREATE_ACCOUNT}
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
