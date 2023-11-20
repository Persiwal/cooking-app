'use client';

import { Container, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Logo from '../../ui/Logo/Logo';
import styles from './Header.module.scss';
import HeaderActions from './HeaderActions/HeaderActions';
import MainNav from './MainNav/MainNav';

const Header = () => {
  const session = useSession();
  const authState =
    session && session.data ? 'authenticated' : 'unauthenticated';

  return (
    <header className={styles.container}>
      <Container size="4">
        <Flex align="center" justify="between">
          <Logo />
          <MainNav type={authState} />
          <HeaderActions type={authState} session={session.data} />
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
