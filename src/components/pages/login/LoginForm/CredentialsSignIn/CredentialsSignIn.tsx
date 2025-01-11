'use client';
import { useLogin } from '@/hooks/query/useLogin';
import useTranslationsObject from '@/hooks/useTranslationsObject';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { PersonIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Text, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import LoadingSpinner from '../../../../ui/LoadingSpinner/LoadingSpinner';
import PasswordInput from '../../../../ui/PasswordInput/PasswordInput';
import styles from './CredentialsSignIn.module.scss';



const CredentialsSignIn = () => {
  const t = useTranslationsObject('pages.login');

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: t.USERNAME_REQUIRED_ERROR }),
    password: z
      .string()
      .min(1, { message: t.PASSWORD_REQUIRED_ERROR }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                {t.USERNAME_LABEL}
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
                  placeholder={t.USERNAME_PLACEHOLDER}
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
                {t.PASSWORD_LABEL}
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
                <span>{t.LOGIN}</span>
              </>
            ) : (
              t.LOGIN_PAGE
            )}
          </Button>
        </Form.Submit>
      </Flex>
    </form>
  );
};

export default CredentialsSignIn;
