'use client';

import { ROUTES } from '@/app/_types/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MainNav.module.scss';

type Props = {
  type: 'unauthenticated' | 'authenticated';
};

const MainNav: React.FC<Props> = ({ type }) => {
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.replace(/\/pl$/, '/');

  const unauthenticatedRoutes = [
    {
      path: ROUTES.HOME_PAGE,
      label: 'Home',
      active: pathnameWithoutLocale === ROUTES.HOME_PAGE,
    },
  ];

  const authenticatedRoutes = [
    {
      path: ROUTES.HOME_PAGE,
      label: 'Home',
      active: pathnameWithoutLocale === ROUTES.HOME_PAGE,
    },
  ];

  const routes =
    type === 'unauthenticated' ? unauthenticatedRoutes : authenticatedRoutes;

  return (
    <nav>
      {routes.map((route) => {
        return (
          <Link
            key={route.path}
            href={route.path}
            className={`${styles.navLink} ${route.active && styles.active}`}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
