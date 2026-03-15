import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/shared/lib/validation/common-schemas';
import { GENDER_VALUES, LOOKING_FOR_VALUES } from '@/shared/lib/auth/external-auth.types';

export const signUpSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50, 'Username must not exceed 50 characters').trim(),
  email: emailSchema,
  password: passwordSchema,
  gender: z.enum(GENDER_VALUES, { message: 'Gender is required' }),
  lookingFor: z.enum(LOOKING_FOR_VALUES, { message: 'Looking for is required' }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  city: z.string().optional(),
  consent: z.boolean().refine((value) => value, {
    message: 'Consent is required',
  }),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
