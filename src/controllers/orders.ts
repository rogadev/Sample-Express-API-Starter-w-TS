import { Request } from 'express';
import fs from 'fs';
import { Order, validate } from '../interfaces/Order';

export const getAll = (req: Request, res: any) => {

  // TODO - get all orders.
  const ordersJson = fs.readFileSync('src/data/pizzaOrders.json', 'utf8');
  const orders = JSON.parse(ordersJson);
  // TODO - page should populate form inputs with form data. Form data is sent if we are creating a new order, submit, and then get an error.
  res.send(orders);
  // TODO - page should populate form errors with error data. Form data is sent if we are editing an order, submit, and then get an error.
  // TODO - clicking on an order in the list will take us to the order detail page for that order.
};

export const createOne = (req: Request, res: any) => {
  const order = req.body;
  // Our form data is a string, but we need to convert price and quantity to a number.
  order.quantity = Number.parseInt(order.quantity);
  order.pricePer = Number.parseFloat(Number.parseFloat(order.pricePer).toFixed(2));
  // Attempt validation. If error, return error data.

  const result = validate(order);

  if (result.errors) {
    console.error('Failed to create new order. Validation error.', result.errors);
    return res.status(400).send({ errors: result.errors });
  }

  // no errors? create the order and add it to our pizzaOrders.json file.
  try {
    // Read and parse the pizzaOrders.json file.
    const ordersJson = fs.readFileSync('src/data/pizzaOrders.json', 'utf8');
    let orders = JSON.parse(ordersJson);
    // Just in case, let's remove all orders that don't have an id. (undefined)
    orders = orders.filter((o: Order) => o.id);
    // We need to create a new id for our new order. Get the length of the orders array, add 1, and use that as the new id.
    const newId = Number.parseInt(orders.length) + 1;
    order.id = newId;
    // Add our new order to the array.
    orders.push(order);
    // Write the updated array to the pizzaOrders.json file.
    fs.writeFileSync('src/data/pizzaOrders.json', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to create ne order. Error reading/writing to file.', e);
    return res.status(500).send('Error creating new order.');
  }
  // Lastly, if successfully creating our new order, return with "success" message.
  return res.status(200).send('Successfully created new order.');
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