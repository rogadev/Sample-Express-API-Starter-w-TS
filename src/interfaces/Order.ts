import { z } from 'zod';

export enum PizzaType {
  Canadian = 'Canadian',
  Cheese = 'Cheese',
  Hawaiian = 'Hawaiian',
  MeatLovers = 'Meat Lovers',
  Pepperoni = 'Pepperoni',
  Vegetarian = 'Vegetarian',
}

export enum CrustType {
  Cauliflower = 'cauliflower',
  DeepDish = 'deep dish',
  Regular = 'regular',
  ThinCrust = 'thin crust',
}

export enum PizzaSize {
  Individual = 'individual',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

const orderSchema = z.object({
  id: z
    .number({ required_error: 'ID must be a number.' })
    .int({ message: 'ID must be an integer.' })
    .optional(),
  type: z
    .nativeEnum(PizzaType, { required_error: `Pizza type must be one of the following: ${Object.values(PizzaType).join(', ')}` }),
  crust: z
    .nativeEnum(CrustType, { required_error: `Crust type must be one of the following: ${Object.values(CrustType).join(', ')}` }),
  size: z
    .nativeEnum(PizzaSize, { required_error: `Pizza size must be one of the following: ${Object.values(PizzaSize).join(', ')}` }),
  quantity: z
    .number({ required_error: 'Quantity must be a number.' })
    .int({ message: 'Quantity must be an integer.' }),
  pricePer: z
    .number({ required_error: 'Price Per must be a number' })
    .min(0),
  orderDate: z
    .string({ required_error: 'Order Date must be entered as a string.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Order date must be in the format yyyy-mm-dd.' }),
});

export const validate = (order: {}) => {
  const result = orderSchema.safeParse(order);
  const success = result.success;
  const errors = success ? null : result.error.flatten().fieldErrors;
  return {
    success,
    errors,
  };
};

export type Order = z.infer<typeof orderSchema>;