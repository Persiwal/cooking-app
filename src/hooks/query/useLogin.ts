import { useMutation } from 'react-query';
import { signIn, SignInResponse } from 'next-auth/react';
import { toast } from 'react-toastify';

interface LoginRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<SignInResponse, Error, LoginRequest>({
    mutationFn: async (requestBody) => {
      const res = await signIn('credentials', {
        redirect: false,
        username: requestBody.username,
        password: requestBody.password,
      });
      if (res.status === 401) {
        throw new Error(res.error);
      }
      return res;
    },
    onSuccess: () => {
      toast.success('Login successful');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};