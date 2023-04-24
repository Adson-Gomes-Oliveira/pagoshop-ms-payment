require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const paymentRoutes = require('./routes/payment.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/health-check', (_req, res) => res.status(200).send('OK!'));
app.use('/api/payments', paymentRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use(errorMiddleware);

module.exports = app;
