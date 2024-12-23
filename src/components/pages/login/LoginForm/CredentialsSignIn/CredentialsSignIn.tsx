'use client';
import LoginPageTranslations from '@/types/messages/pages/login';
import { ROUTES } from '@/types/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { PersonIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Text, TextField } from '@radix-ui/themes';
import { SignInResponse, signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as z from 'zod';
import LoadingSpinner from '../../../../ui/LoadingSpinner/LoadingSpinner';
import PasswordInput from '../../../../ui/PasswordInput/PasswordInput';
import styles from './CredentialsSignIn.module.scss';

const CredentialsSingIn = () => {
  const t = useTranslations();

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: t(LoginPageTranslations.USERNAME_REQUIRED_ERROR) }),
    password: z
      .string()
      .min(1, { message: t(LoginPageTranslations.PASSWORD_REQUIRED_ERROR) }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useMutation<
    SignInResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: (requestBody) =>
      signIn('credentials', {
        redirect: false,
        username: requestBody.username,
        password: requestBody.password,
      }),
    onSuccess: (res) => {
      if (res.status === 401) {
        throw new Error(res.error);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  useEffect(() => {
    if (loginMutation.isSuccess) {
      if (loginMutation.data.ok) {
        toast.success(t(LoginPageTranslations.LOGIN_SUCCESS));
        redirect(ROUTES.HOME_PAGE);
      }
    }
  }, [loginMutation.isSuccess]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    const requestBody = { username: username, password };

    const loggedUser = await loginMutation.mutateAsync(requestBody);
  };

  return (
    <Form.Root onSubmit={form.handleSubmit(onSubmit)}>
      <Container className={styles.serverErrorContainer}>
        <Text>{loginMutation.isError && loginMutation.error.message}</Text>
      </Container>

      <Flex direction="column" gap="5">
        <Controller
          name="username"
          control={form.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Form.Field
              name="username"
              className={`${styles.field} ${fieldState.error && styles.error}`}
            >
              <Form.Label className={styles.label}>
                {t(LoginPageTranslations.USERNAME_LABEL)}
              </Form.Label>
              <TextField.Root>
                <TextField.Slot>
                  <PersonIcon />
                </TextField.Slot>
                <TextField.Input
                  value={field.value}
                  size="3"
                  className={styles.input}
                  onChange={field.onChange}
                  placeholder={t(LoginPageTranslations.USERNAME_PLACEHOLDER)}
                />
              </TextField.Root>
              {fieldState.error && (
                <Form.Message className={styles.errorMsg}>
                  {fieldState.error.message}
                </Form.Message>
              )}
            </Form.Field>
          )}
        />

        <Controller
          name="password"
          rules={{ required: true }}
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field
              name="password"
              className={`${styles.field} ${fieldState.error && styles.error}`}
            >
              <Form.Label className={styles.label}>
                {t(LoginPageTranslations.PASSWORD_LABEL)}
              </Form.Label>
              <PasswordInput onChange={field.onChange} value={field.value} />
              {fieldState.error && (
                <Form.Message className={styles.errorMsg}>
                  {fieldState.error.message}
                </Form.Message>
              )}
            </Form.Field>
          )}
        />

        <Form.Submit asChild>
          <Button
            size="3"
            className={styles.loginButton}
            disabled={loginMutation.isLoading}
            type="submit"
          >
            {loginMutation.isLoading ? (
              <>
                <LoadingSpinner />
                <span>{t(LoginPageTranslations.LOGIN)}</span>
              </>
            ) : (
              t(LoginPageTranslations.LOGIN)
            )}
          </Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
};

export default CredentialsSingIn;
