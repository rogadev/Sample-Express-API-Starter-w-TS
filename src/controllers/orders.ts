import { Request } from 'express';
import fs from 'fs';
import { Order, validate, PizzaSize, PizzaType, CrustType } from '../interfaces/Order';

const htmlSizeOptions = (defaultSize: PizzaSize) => {
  return Object.values(PizzaSize).map((size) => {
    return `<option value="${size}" ${defaultSize === size ? 'selected' : ''}>${size}</option>`;
  });
};

const htmlTypeOptions = (defaultType: PizzaType) => {
  return Object.values(PizzaType).map((type) => {
    return `<option value="${type}" ${defaultType === type ? 'selected' : ''}>${type}</option>`;
  });
};

const htmlCrustOptions = (defaultCrust: CrustType) => {
  return Object.values(CrustType).map((crust) => {
    return `<option value="${crust}" ${defaultCrust === crust ? 'selected' : ''}>${crust}</option>`;
  });
};

const getTotal = (pricePer: number, quantity: number) => {
  pricePer = Number.parseFloat(pricePer.toFixed(2));
  quantity = Number.parseInt(quantity.toFixed(0));
  const total = pricePer * quantity;
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
};

const createHTMLOrderForm = (order: Order) => {
  const { id, type, crust, size, quantity, pricePer, orderDate } = order;
  const date = orderDate.split('/').join('-');

  return `
  <html lang="en">
    <head>
      <title>Order #${id}</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous"
      />
    </head>
    <body>
      <form method="PUT" action="/orders/${id}">
        <div>
          <p>Order #${id}</p>
        </div>
        <div>
          <label for="type">Type</label>
          <select name="type" id="type">
            ${htmlTypeOptions(type)}
          </select>

        </div>
        <div>
          <label for="crust">Crust</label>
          <select name="crust" id="crust">
            ${htmlCrustOptions(crust)}
          </select>
        </div>
        <div>
          <label for="size">Size</label>
          <select name="size" id="size">
            ${htmlSizeOptions(size)}
          </select>
        </div>
        <div>
          <label for="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" value="${quantity}" />
        </div>
        <div>
          <label for="pricePer">Price Per</label>
          <input type="number" min="0.01" max="100.00" step="0.01" name="pricePer" id="pricePer" value="${pricePer}" />
        </div>
        <div>
          <label for="orderDate">Order Date</label>
          <input type="date" name="orderDate" id="orderDate" value="${date}" />
        </div>
        <div>
          <p>Total Price: ${getTotal(pricePer, quantity)}</p>
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </body>
  </html>
  `;
};

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

  const ordersJson = fs.readFileSync('src/data/pizzaOrders.json', 'utf8');
  const orders = JSON.parse(ordersJson);

  const order = orders.find((o: Order) => o.id === Number.parseInt(id));
  if (!order) {
    return res.status(404).send('Order not found.');
  }

  const html = createHTMLOrderForm(order);

  res.send(html);
};

export const updateOne = (req: Request, res: any) => {
  // find this order matching the id.
  const { id } = req.params;
  const ordersJson = fs.readFileSync('src/data/pizzaOrders.json', 'utf8');
  const orders = JSON.parse(ordersJson);
  const order = orders.find((o: Order) => o.id === Number.parseInt(id));
  // if order doesn't exist, return 404.
  if (!order) {
    console.error('Failed to update order. Order not found.', id);
    return res.status(404).send('Order not found.');
  }
  // if order exists, validate input fields
  console.log('req.body', req.body);
  const result = validate(req.body);
  if (!result.success) {
    console.error('Failed to update order. Validation error.', result.errors);
    return res.status(400).send({ errors: result.errors });
  }
  // if validation passes, update order.
  try {
    // Update the order.
    order.type = req.body.type;
    order.crust = req.body.crust;
    order.size = req.body.size;
    order.quantity = Number.parseInt(req.body.quantity);
    order.pricePer = Number.parseFloat(Number.parseFloat(req.body.pricePer).toFixed(2));
    order.orderDate = req.body.orderDate;
    // Write the updated array to the pizzaOrders.json file.
    fs.writeFileSync('src/data/pizzaOrders.json', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to update order. Error reading/writing to file.', e);
    return res.status(500).send('Error updating order.');
  }
  // Lastly, if successfully updating our order, redirect to same page, but with a get request.
  return res.redirect(`/orders/${id}`);

};

export const deleteOne = (req: Request, res: any) => {
  const { id } = req.params;
  // TODO - find this order matching the id.
  // TODO - if order doesn't exist, return 404.
  // TODO - if order exists, delete order.
  res.send(`DELETE / orders / ${id} `);
};