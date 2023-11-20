import Translations from '@/app/_types/messages/pages/login';
import { ROUTES } from '@/app/_types/routes';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CredentialsSingIn from './CredentialsSignIn/CredentialsSignIn';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const t = useTranslations();

  return (
    <Box
      className={styles.container}
      width={{ initial: '100%', xs: 'min-content' }}
    >
      <Box className={styles.heading}>
        <Heading>{t(Translations.LOGIN)}</Heading>
      </Box>

      <CredentialsSingIn />

      <Container mt="5">
        <Flex gap="2" justify="center">
          <Text>{t(Translations.DONT_HAVE_ACCOUNT)}</Text>
          <Link href={ROUTES.REGISTER_PAGE}>
            <Flex align="center" gap="1" justify="center">
              {t(Translations.REGISTER_NOW)}
              <ArrowRightIcon />
            </Flex>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default LoginForm;
