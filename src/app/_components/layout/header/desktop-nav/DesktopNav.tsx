'use client';

import useRoutes from '@/app/_hooks/useRoutes';
import Link from 'next/link';
import styles from './DesktopNav.module.scss';

const DesktopNav = () => {
  const routes = useRoutes();

  return (
    <nav className={styles.nav}>
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

export default DesktopNav;
