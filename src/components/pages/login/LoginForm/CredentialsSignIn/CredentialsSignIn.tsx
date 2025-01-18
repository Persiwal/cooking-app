'use client';
import useTranslationsObject from '@/hooks/useTranslationsObject';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { PersonIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex, TextField } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import PasswordInput from '../../../../ui/PasswordInput/PasswordInput';
import styles from './CredentialsSignIn.module.scss';

const CredentialsSignIn = () => {
  const T = useTranslationsObject('pages.login');

  const formSchema = z.object({
    username: z.string().min(1, { message: T.USERNAME_REQUIRED_ERROR }),
    password: z.string().min(1, { message: T.PASSWORD_REQUIRED_ERROR }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // const loginMutation = useLogin();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (res?.status === 200) {
      redirect('/');
    }
  };

  return (
    <Form.Root onSubmit={form.handleSubmit(onSubmit)}>
      <Container className={styles.serverErrorContainer}>
        {/* <Text>{loginMutation.isError && loginMutation.error.message}</Text> */}
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
                {T.USERNAME_LABEL}
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
                  placeholder={T.USERNAME_PLACEHOLDER}
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
                {T.PASSWORD_LABEL}
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
            // disabled={loginMutation.isPending}
            type="submit"
          >
            {/* {loginMutation.isPending ? (
              <>
                <LoadingSpinner />
              </>
            ) : ( */}
            {T.LOGIN}
            {/* )} */}
          </Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
};

export default CredentialsSignIn;
