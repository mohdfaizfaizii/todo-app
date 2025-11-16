import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { api } from '../utils/api';
import {
  authResponseSchema,
  forgotPasswordResponseSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type AuthResponse,
  type ForgotPasswordResponse,
} from '../schemas/validation';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: LoginFormData): Promise<AuthResponse> => {
      const response = await api.post('/auth/login', data);
      return authResponseSchema.parse(response.data);
    },
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });
};

export const useRegister = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: RegisterFormData): Promise<AuthResponse> => {
      const response = await api.post('/auth/register', data);
      return authResponseSchema.parse(response.data);
    },
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordFormData): Promise<ForgotPasswordResponse> => {
      const response = await api.post('/auth/forgotpassword', data);
      return forgotPasswordResponseSchema.parse(response.data);
    },
  });
};

export const useResetPassword = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ token, data }: { token: string; data: ResetPasswordFormData }): Promise<AuthResponse> => {
      const response = await api.put(`/auth/resetpassword/${token}`, { password: data.password });
      return authResponseSchema.parse(response.data);
    },
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });
};