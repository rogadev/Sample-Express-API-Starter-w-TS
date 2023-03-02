import express from 'express';
import * as orders from '../controllers/orders';

const router = express.Router();

router.get('/orders', orders.getAll);

router.post('/orders', orders.createOne);

router.get('/orders/:id', orders.getOne);

router.put('/orders/:id', orders.updateOne);

router.delete('/orders/:id', orders.deleteOne);

export default router;