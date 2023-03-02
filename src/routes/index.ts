import express from 'express';
import * as orders from '../controllers/orders';
import { Response } from 'express';

const router = express.Router();

router.get<{}, Response>('/orders', orders.getAll);

router.post<{}, Response>('/orders', orders.createOne);

router.get<{ id: number; }, Response>('/orders/:id', orders.getOne);

router.put<{ id: number; }, Response>('/orders/:id', orders.updateOne);

router.delete<{ id: number; }, Response>('/orders/:id', orders.deleteOne);

export default router;