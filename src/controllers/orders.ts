import { Request } from 'express';
import fs from 'fs';

export const getAll = (_: Request, res: any) => {
  // TODO - get all orders.
  const ordersJson = fs.readFileSync('src/data/pizzaOrders.json', 'utf8');
  const orders = JSON.parse(ordersJson);
  // TODO - page should populate form inputs with form data. Form data is sent if we are creating a new order, submit, and then get an error.
  res.send(orders);
  // TODO - page should populate form errors with error data. Form data is sent if we are editing an order, submit, and then get an error.
  // TODO - clicking on an order in the list will take us to the order detail page for that order.
};

export const createOne = (_: Request, res: any) => {
  // TODO - get form data from request body.
  // TODO - validate form data.
  // TODO - if there's an error:
  // TODO  - returns data for a form to create a new order.
  // TODO  - returns error data related to each field of the form.
  // TODO - if no errors, create a new order.
  res.send('POST /orders');
};

export const getOne = (req: Request, res: any) => {
  const { id } = req.params;
  // TODO - get order by id.
  // TODO - if order doesn't exist, return 404.
  // TODO - if order exists, return order data.
  res.send(`GET /orders/${id}`);
};

export const updateOne = (req: Request, res: any) => {
  const { id } = req.params;
  // TODO - find this order matching the id.
  // TODO - if order doesn't exist, return 404.
  // TODO - if order exists:
  // TODO   - get form data from request body.
  // TODO   - validate form data.
  // TODO   - if there's an error:
  // TODO    - returns data for a form to edit an order.
  // TODO    - returns error data related to each field of the form.
  // TODO   - if no errors, update order.
  res.send(`PUT /orders/${id}`);
};

export const deleteOne = (req: Request, res: any) => {
  const { id } = req.params;
  // TODO - find this order matching the id.
  // TODO - if order doesn't exist, return 404.
  // TODO - if order exists, delete order.
  res.send(`DELETE /orders/${id}`);
};