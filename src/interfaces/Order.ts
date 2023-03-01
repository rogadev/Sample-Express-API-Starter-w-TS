import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.number(),
  type: z.enum(['Canadian', 'Cheese', 'Hawaiian', 'Meat Lovers', 'Pepperoni', 'Vegetarian']),
  crust: z.enum(['cauliflower', 'deep dish', 'regular', 'thin crust']),
  size: z.enum(['individual', 'small', 'medium', 'large']),
  quantity: z.number(),
  pricePer: z.number(),
  orderDate: z.string(),
});

type Order = z.infer<typeof OrderSchema>;

export default Order;
