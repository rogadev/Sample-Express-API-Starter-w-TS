import express from 'express';
import * as orders from '../controllers/orders';
import { Response } from 'express';

const router = express.Router();

router.get<{ id: number; }, Response>('/orders/:id', orders.getOne);

router.post<{ id: number; }, Response>('/orders/:id', orders.updateOne);

router.delete<{ id: number; }, Response>('/orders/:id', orders.deleteOne);

export default router;