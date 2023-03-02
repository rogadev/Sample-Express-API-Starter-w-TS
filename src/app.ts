import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import routes from './routes';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// ROUTE LIST
app.get('/', (_, res) => {
  res.send(`
    <h1>Order API</h1>
    <p>Order API is a RESTful API for managing orders.</p>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <a href="/orders">GET '/orders'</a>
      <a href="/orders">POST '/orders'</a>
      <a href="/orders/1">GET '/orders/1'</a>
      <a href="/orders/1">PUT '/orders/1'</a>
      <a href="/orders/1">DELETE '/orders/1'</a>
    </div>
  `);
});

// CONTROLLERS
app.use('/', routes);
app.use('/api/v1', api);

// MIDDLEWARES
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
