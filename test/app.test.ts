import request from 'supertest';

import app from '../src/app';

describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /', () => {
  it("responds with a list of anchor tags that describe each of the routes we're building.", (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
