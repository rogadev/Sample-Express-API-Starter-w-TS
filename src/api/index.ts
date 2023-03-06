import express from 'express';

import { MessageResponse } from '../interfaces/MessageResponse';
import { Order } from '../interfaces/Order';
import * as orders from '../controllers/orders';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.',
  });
});

router.get<{}, Order[]>('/orders', orders.getAll);

router.post<{}, MessageResponse>('/orders', orders.createOne);

export default router;
