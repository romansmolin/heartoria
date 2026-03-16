import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
  consent: z.boolean().refine((value) => value, {
    message: 'Consent is required',
  }),
});

export type SignInFormValues = z.input<typeof signInSchema>;
export type SignInDto = z.output<typeof signInSchema>;
