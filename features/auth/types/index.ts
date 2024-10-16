import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type SignupDTO = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type SigninDTO = z.infer<typeof signinSchema>;
