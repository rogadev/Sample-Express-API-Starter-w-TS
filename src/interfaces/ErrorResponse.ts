import { z } from 'zod';
import { MessageResponseSchema } from './MessageResponse';

const ErrorResponseSchema = MessageResponseSchema.extend({
  error: z.string().optional(),
  stack: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const validate = (data: unknown) => {
  const result = ErrorResponseSchema.safeParse(data);
  if (result.success) return { success: true, errors: null };
  return { success: false, errors: result.error.flatten().fieldErrors };
};