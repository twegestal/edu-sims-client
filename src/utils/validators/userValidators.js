import { z } from 'zod';
import { handleZodErrors } from './validationUtils';

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Lösenord måste vara minst 8 tecken')
    .regex(/[a-z]/, 'Lösenord måste innehålla minst en gemen')
    .regex(/[A-Z]/, 'Lösenord måste innehålla minst en versal')
    .regex(/[0-9]/, 'Lösenord måste innehålla minst en siffra')
    .regex(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
      'Lösenord måste innehålla minst ett specialtecken',
    ),
});

const loginSchema = passwordSchema.extend({
  email: z.string().min(1, 'Email måste vara ifylld').email('Email behöver vara giltig'),
});

const registerSchema = loginSchema.extend({
  group_id: z.string().min(1, 'Registreringskod måste vara ifylld'),
});

export const validatePassword = (data) => {
  try {
    passwordSchema.parse(data);
    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    return handleZodErrors(error);
  }
};

export const validateLogin = (data) => {
  try {
    loginSchema.parse(data);
    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    return handleZodErrors(error);
  }
};

export const validateRegistration = (data) => {
  try {
    registerSchema.parse(data);
    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    return handleZodErrors(error);
  }
};
