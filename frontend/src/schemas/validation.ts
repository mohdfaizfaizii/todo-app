import { z } from 'zod';

// Form validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// API Response schemas
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const authResponseSchema = z.object({
  success: z.boolean(),
  token: z.string(),
  user: userSchema,
  message: z.string().optional(),
});

export const todoSchemaResponse = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const todosResponseSchema = z.object({
  success: z.boolean(),
  count: z.number(),
  data: z.array(todoSchemaResponse),
});

export const todoResponseSchema = z.object({
  success: z.boolean(),
  data: todoSchemaResponse,
});

export const forgotPasswordResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  resetToken: z.string().optional(),
  resetUrl: z.string().optional(),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TodoFormData = z.infer<typeof todoSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type TodosResponse = z.infer<typeof todosResponseSchema>;
export type TodoResponse = z.infer<typeof todoResponseSchema>;
export type ForgotPasswordResponse = z.infer<typeof forgotPasswordResponseSchema>;
export type Todo = z.infer<typeof todoSchemaResponse>;
export type User = z.infer<typeof userSchema>;