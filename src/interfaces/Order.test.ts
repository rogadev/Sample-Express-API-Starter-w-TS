import { validate } from './Order';

test('Order validation function returns success when order is valid', () => {
  const order = {
    id: 1,
    type: 'Canadian',
    crust: 'thin crust',
    size: 'large',
    quantity: 1,
    pricePer: 12.99,
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  console.log(errors);
  expect(success).toBe(true);
  expect(errors).toBe(null);
});

test('Order validation function returns errors when order is not an object', () => {
  const order = 'Candy, pumpkins, and one potato.';
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order id is invalid', () => {
  const order = {
    id: '1',
    type: 'Canadian',
    crust: 'thin crust',
    size: 'large',
    quantity: 1,
    pricePer: 12.99,
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order type is invalid', () => {
  const order = {
    id: 1,
    type: 'Pork Chop',
    crust: 'thin crust',
    size: 'large',
    quantity: 1,
    pricePer: 12.99,
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order crust is invalid', () => {
  const order = {
    id: 1,
    type: 'Canadian',
    crust: 'chicken',
    size: 'large',
    quantity: 1,
    pricePer: 12.99,
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order size is invalid', () => {
  const order = {
    id: 1,
    type: 'Canadian',
    crust: 'thin crust',
    size: 'huge',
    quantity: 1,
    pricePer: 12.99,
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order quantity is invalid', () => {
  const order = {
    id: 1,
    type: 'Canadian',
    crust: 'thin crust',
    size: 'large',
    quantity: '1',
    pricePer: 12.99,
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order price per is invalid', () => {
  const order = {
    id: 1,
    type: 'Canadian',
    crust: 'thin crust',
    size: 'large',
    quantity: 1,
    pricePer: 'ff',
    orderDate: '2021-01-01',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('Order validation function returns errors when order date is invalid', () => {
  const order = {
    id: 1,
    type: 'Canadian',
    crust: 'thin crust',
    size: 'large',
    quantity: 1,
    pricePer: 12.99,
    orderDate: 'tomorrow',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('We get an expected error message in the errors object for every invalid field', () => {
  const order = {
    id: '1',
    type: 'Pork Chop',
    crust: 'chicken',
    size: 'huge',
    quantity: '1',
    pricePer: 'fff',
    orderDate: 'tomorrow',
  };
  const { success, errors } = validate(order);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
  expect(errors).toHaveProperty('id');
  expect(errors).toHaveProperty('type');
  expect(errors).toHaveProperty('crust');
  expect(errors).toHaveProperty('size');
  expect(errors).toHaveProperty('quantity');
  expect(errors).toHaveProperty('pricePer');
  expect(errors).toHaveProperty('orderDate');
});