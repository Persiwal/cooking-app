'use client';
import LoadingSpinner from '@/app/_components/ui/LoadingSpinner/LoadingSpinner';
import PasswordInput from '@/app/_components/ui/PasswordInput/PasswordInput';
import register from '@/app/_helpers/api-helpers/auth/register';
import RegisterPageTranslations from '@/app/_types/messages/pages/register';
import { ROUTES } from '@/app/_types/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { ArrowRightIcon, EnvelopeClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Box, Button, Container, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as z from 'zod';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const t = useTranslations();

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: t(RegisterPageTranslations.USERNAME_REQUIRED_ERROR) })
      .min(3, { message: t(RegisterPageTranslations.USERNAME_MIN_LENGTH_ERROR) })
      .max(20, { message: t(RegisterPageTranslations.USERNAME_MAX_LENGTH_ERROR) }),
    email: z
      .string()
      .min(1, { message: t(RegisterPageTranslations.EMAIL_REQUIRED_ERROR) })
      .email({ message: t(RegisterPageTranslations.EMAIL_INVALID_ERROR) }),
    password: z
      .string()
      .min(1, { message: t(RegisterPageTranslations.PASSWORD_REQUIRED_ERROR) })
      .min(6, { message: t(RegisterPageTranslations.PASSWORD_LENGTH_ERROR) }),
    confirmPassword: z.string({
      required_error: t(RegisterPageTranslations.PASSWORD_REQUIRED_ERROR),
    }),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: t(RegisterPageTranslations.PASSWORD_MISMATCH_ERROR),
        path: ['confirmPassword'],
      });
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (requestBody: { name: string, email: string, password: string }) => register(requestBody),
    onSuccess: (res) => { },
    onError: (error: Error) => {
      console.error(error.message);
    }
  });

  useEffect(() => {
    if (registerMutation.isSuccess) {
      toast.success(t(RegisterPageTranslations.REGISTER_SUCCESS));
      redirect(ROUTES.LOGIN_PAGE);
    }
  }, [registerMutation.isSuccess]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, username, password } = values;
    const requestBody = { email, name: username, password };

    const registeredUser = await registerMutation.mutateAsync(requestBody);
  };

  return (
    <Box
      className={styles.container}
      width={{ initial: '100%', xs: 'min-content' }}
    >
      <Box className={styles.heading}>
        <Heading>{t(RegisterPageTranslations.SIGN_UP)}</Heading>
      </Box>

      <Form.Root onSubmit={form.handleSubmit(onSubmit)}>
        <Container className={styles.serverErrorContainer}>
          <Text>
            {registerMutation.isError && registerMutation.error.message}
          </Text>
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
                  {t(RegisterPageTranslations.USERNAME_LABEL)}
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
                    placeholder={t(RegisterPageTranslations.USERNAME_PLACEHOLDER)}
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
            name="email"
            rules={{ required: true }}
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field
                name="email"
                className={`${styles.field} ${fieldState.error && styles.error}`}
              >
                <Form.Label className={styles.label}>
                  {t(RegisterPageTranslations.EMAIL_LABEL)}
                </Form.Label>
                <TextField.Root>
                  <TextField.Slot>
                    <EnvelopeClosedIcon />
                  </TextField.Slot>
                  <TextField.Input
                    value={field.value}
                    size="3"
                    className={styles.input}
                    onChange={field.onChange}
                    placeholder={t(RegisterPageTranslations.EMAIL_PLACEHOLDER)}
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
                  {t(RegisterPageTranslations.PASSWORD_LABEL)}
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

          <Controller
            name="confirmPassword"
            rules={{ required: true }}
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field
                name="confirmPassword"
                className={`${styles.field} ${fieldState.error && styles.error}`}
              >
                <Form.Label className={styles.label}>
                  {t(RegisterPageTranslations.CONFIRM_PASSWORD_LABEL)}
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
            <Button size="3" className={styles.registerButton} disabled={registerMutation.isLoading} type='submit'>
              {registerMutation.isLoading ?
                <>
                  <LoadingSpinner />
                  <span>
                    {t(RegisterPageTranslations.REGISTERING)}
                  </span>
                </>
                :
                t(RegisterPageTranslations.REGISTER_BUTTON)}
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>

      <Container mt="5">
        <Flex gap="2" justify="center">
          <Text>
            {t(RegisterPageTranslations.ALREADY_HAVE_ACCOUNT)}
          </Text>
          <Link href={ROUTES.LOGIN_PAGE}>
            <Flex align="center" gap="1" justify="center">
              {t(RegisterPageTranslations.GO_TO_LOGIN_PAGE)}
              <ArrowRightIcon />
            </Flex>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default RegisterForm;
