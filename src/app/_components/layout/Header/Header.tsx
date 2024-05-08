'use client';

import { Container, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Logo from '../../ui/Logo/Logo';
import styles from './Header.module.scss';
import MainNav from './desktop-nav/DesktopNav';
import HeaderActions from './header-actions/HeaderActions';
import MobileMenu from './mobile-menu/MobileMenu';

const Header = () => {
  const session = useSession();

  return (
    <header className={styles.header}>
      <Container size="4" px="4" py="2">

        {/* mobile */}
        <Flex align="center" justify="between" className={styles.mobile}>
          <Logo />
          <MobileMenu session={session.data} />
        </Flex>
        {/* mobile */}

        {/* desktop */}
        <Flex align="center" justify="between" className={styles.desktop}>
          <Logo />
          <MainNav />
          <HeaderActions session={session.data} />
        </Flex>
        {/* desktop */}

      </Container>
    </header>
  );
};

export default Header;
