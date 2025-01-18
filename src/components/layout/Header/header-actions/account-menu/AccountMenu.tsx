'use client';

import useTranslationsObject from '@/hooks/useTranslationsObject';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  ExitIcon as LogoutIcon,
  GearIcon as SettingsIcon,
  PersonIcon as UserProfileIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Avatar from '../../../../ui/Avatar/Avatar';
import styles from './AccountMenu.module.scss';

type Props = {
  session: Session;
};

const AccountMenu: React.FC<Props> = ({ session }) => {
  const t = useTranslationsObject('layout.header.headerActions');
  const { user } = session;
  const usernameFirstLetter = user?.name?.charAt(0).toUpperCase() || '';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className={styles.avatarButton} aria-label="Customise options">
          <Avatar
            src={user?.image ?? undefined}
            alt="your account"
            fallback={usernameFirstLetter}
          />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdownMenuContent}
          sideOffset={5}
        >
          <div>
            <Flex align="center" style={{ gap: '20px' }}>
              <Avatar
                src={user?.image ?? undefined}
                alt="your account"
                fallback={usernameFirstLetter}
                size="large"
              />
              <Flex justify="center" direction="column" align="center">
                <Text style={{ fontSize: '1.25rem' }}>
                  <strong>{user?.name}</strong>
                </Text>
                <Text style={{ fontSize: '0.8rem' }} color="gray">
                  {user?.email}
                </Text>
              </Flex>
            </Flex>
          </div>

          <DropdownMenu.Separator className={styles.dropdownMenuSeparator} />

          <DropdownMenu.Item className={styles.dropdownMenuItem} disabled>
            <UserProfileIcon />
            {t.YOUR_PROFILE}
          </DropdownMenu.Item>

          <DropdownMenu.Item className={styles.dropdownMenuItem} disabled>
            <SettingsIcon />
            {t.SETTINGS}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={styles.dropdownMenuSeparator} />

          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
            onClick={() => signOut()}
          >
            <LogoutIcon />
            {t.LOGOUT}
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={styles.dropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AccountMenu;
