import { useMutation } from '@tanstack/react-query';
import { signIn, SignInResponse } from 'next-auth/react';
import { toast } from 'react-toastify';

interface LoginRequest {
  username: string;
  password: string;
}
const useLogin = () => {
  return useMutation<SignInResponse, Error, LoginRequest>({
    mutationFn: async (requestBody: LoginRequest) => {
      const res = await signIn('credentials', {
        redirect: false,
        username: requestBody.username,
        password: requestBody.password,
      });
      if (!res) {
        throw new Error('No response from server');
      }
      if (res.status === 401) {
        throw new Error(res.error || 'Unknown error');
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

export default useLogin;
