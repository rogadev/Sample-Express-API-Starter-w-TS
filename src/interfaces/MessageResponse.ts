import { z } from 'zod';

export const MessageResponseSchema = z.object({
  message: z
    .string({ required_error: 'Message string is required.' })
    .min(1, { message: 'Message string must be at least 1 character long.' }),
});

export const validate = (data: unknown) => {
  const result = MessageResponseSchema.safeParse(data);
  if (result.success) return { success: true, errors: null };
  return { success: false, errors: result.error.flatten().fieldErrors };
};

export type MessageResponse = z.infer<typeof MessageResponseSchema>;