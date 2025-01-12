'use client';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';
import PasswordInput from '@/components/ui/PasswordInput/PasswordInput';
import register from '@/helpers/api-helpers/auth/register';
import useTranslationsObject from '@/hooks/useTranslationsObject';
import { ROUTES } from '@/types/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import {
  ArrowRightIcon,
  EnvelopeClosedIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const t = useTranslationsObject("pages.register");

  const formSchema = z
    .object({
      username: z
        .string()
        .min(1, { message: t.USERNAME_REQUIRED_ERROR })
        .min(3, { message: t.USERNAME_MIN_LENGTH_ERROR })
        .max(20, { message: t.USERNAME_MAX_LENGTH_ERROR }),
      email: z
        .string()
        .min(1, { message: t.EMAIL_REQUIRED_ERROR })
        .email({ message: t.EMAIL_INVALID_ERROR }),
      password: z
        .string()
        .min(1, { message: t.PASSWORD_REQUIRED_ERROR })
        .min(6, { message: t.PASSWORD_LENGTH_ERROR }),
      confirmPassword: z.string({
        required_error: t.PASSWORD_REQUIRED_ERROR,
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: t.PASSWORD_MISMATCH_ERROR,
          path: ['confirmPassword'],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (requestBody: {
      name: string;
      email: string;
      password: string;
    }) => register(requestBody),
    onSuccess: (res) => {
      toast.success(t.REGISTER_SUCCESS);
      redirect(ROUTES.LOGIN_PAGE);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, username, password } = values;
    const requestBody = { email, name: username, password };

    await registerMutation.mutateAsync(requestBody);
  };

  return (
    <Box
      className={styles.container}
      width={{ initial: '100%', xs: 'min-content' }}
    >
      <Box className={styles.heading}>
        <Heading>{t.SIGN_UP}</Heading>
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
                className={`${styles.field} ${fieldState.error && styles.error
                  }`}
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
            name="email"
            rules={{ required: true }}
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field
                name="email"
                className={`${styles.field} ${fieldState.error && styles.error
                  }`}
              >
                <Form.Label className={styles.label}>
                  {t.EMAIL_LABEL}
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
                    placeholder={t.EMAIL_PLACEHOLDER}
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
                className={`${styles.field} ${fieldState.error && styles.error
                  }`}
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

          <Controller
            name="confirmPassword"
            rules={{ required: true }}
            control={form.control}
            render={({ field, fieldState }) => (
              <Form.Field
                name="confirmPassword"
                className={`${styles.field} ${fieldState.error && styles.error
                  }`}
              >
                <Form.Label className={styles.label}>
                  {t.CONFIRM_PASSWORD_LABEL}
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
              className={styles.registerButton}
              disabled={registerMutation.isPending}
              type="submit"
            >
              {registerMutation.isPending ? (
                <>
                  <LoadingSpinner />
                  <span>{t.REGISTERING}</span>
                </>
              ) : (
                t.REGISTER_BUTTON
              )}
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>

      <Container mt="5">
        <Flex gap="2" justify="center">
          <Text>{t.ALREADY_HAVE_ACCOUNT}</Text>
          <Link href={ROUTES.LOGIN_PAGE}>
            <Flex align="center" gap="1" justify="center">
              {t.GO_TO_LOGIN_PAGE}
              <ArrowRightIcon />
            </Flex>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default RegisterForm;
