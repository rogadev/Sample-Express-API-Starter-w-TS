import request from 'supertest';
import app from '../app';

describe("GET '/orders", () => {
  it('Should return the orders.html page (public/orders.html).', () => {
    return request(app)
      .get('/orders')
      .expect('Content-Type', /html/);


  });
});