'use client';
import LoadingSpinner from '@/app/_components/ui/LoadingSpinner/LoadingSpinner';
import PasswordInput from '@/app/_components/ui/PasswordInput/PasswordInput';
import register from '@/app/_helpers/api-helpers/auth/register';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { EnvelopeClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Box, Button, Container, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as z from 'zod';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const t = useTranslations("pages.register");

  const formSchema = z.object({
    username: z
      .string({ required_error: t('usernameRequiredError') })
      .min(3, { message: t('usernameMinLengthError') })
      .max(20, { message: t('usernameMaxLengthError') }),
    email: z
      .string({ required_error: t('emailRequiredError') })
      .email({ message: t('emailInvalidError') }),
    password: z
      .string({ required_error: t('passwordRequiredError') })
      .min(6, { message: t('passwordLengthError') }),
    confirmPassword: z.string({
      required_error: t('confirmPasswordRequiredError'),
    }),
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: t('passwordMismatchError'),
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
    onSuccess: (res) => {
      form.reset();
    },
    onError: (error: Error) => {
      console.error(error.message);
    }
  });

  useEffect(() => {
    if (registerMutation.isSuccess) {
      toast.success(t('registrationSuccessMessage'));
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
        <Heading>{t('signUp')}</Heading>
      </Box>

      <Form.Root onSubmit={form.handleSubmit(onSubmit)}>
        <Container className={styles.serverErrorContainer}>
          <Text>
            {registerMutation.isError && t('serverError')}
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
                <Form.Label className={styles.label}>{t('usernameLabel')}</Form.Label>
                <TextField.Root>
                  <TextField.Slot>
                    <PersonIcon />
                  </TextField.Slot>
                  <TextField.Input
                    value={field.value}
                    size="3"
                    className={styles.input}
                    onChange={field.onChange}
                    placeholder={t('usernamePlaceholder')}
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
                <Form.Label className={styles.label}>{t('emailLabel')}</Form.Label>
                <TextField.Root>
                  <TextField.Slot>
                    <EnvelopeClosedIcon />
                  </TextField.Slot>
                  <TextField.Input
                    value={field.value}
                    size="3"
                    className={styles.input}
                    onChange={field.onChange}
                    placeholder={t('emailPlaceholder')}
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
                <Form.Label className={styles.label}>{t('passwordLabel')}</Form.Label>
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
                  {t('confirmPasswordLabel')}
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
                    {t('registering')}
                  </span>
                </>
                :
                t('registerButton')}
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Box>
  );
};

export default RegisterForm;
