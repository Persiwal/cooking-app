'use client';

import useRoutes from '@/hooks/useRoutes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Session } from 'next-auth';
import Link from 'next/link';
import HeaderActions from '../header-actions/HeaderActions';
import styles from './MobileMenu.module.scss';

type Props = {
  session: Session;
};

const MobileMenu: React.FC<Props> = ({ session }) => {
  const routes = useRoutes();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton radius="full" className={styles.hamburgerButton}>
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdownMenuContent}>
          {routes.map((route) => {
            return (
              <DropdownMenu.Item
                key={route.path}
                className={styles.dropdownMenuItem}
              >
                <Link
                  href={route.path}
                  className={`${styles.navLink} ${route.active && styles.active}`}
                >
                  {route.label}
                </Link>
              </DropdownMenu.Item>
            );
          })}

          <DropdownMenu.Separator className={styles.dropdownMenuSeparator} />

          <HeaderActions session={session} isMobile={true} />

          <DropdownMenu.Arrow className={styles.dropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MobileMenu;
