/* eslint-disable no-console */
const app = require('./app');
const createInvoiceByOrderAndPayment = require('./services/createInvoiceByOrderAndPayment.consumer.service');
const createPaymentByOrder = require('./services/createPaymentByOrder.consumer.service');
require('dotenv').config();

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  createPaymentByOrder('paymentCreation', 'orderConfirmationToPayment');
  createInvoiceByOrderAndPayment('invoiceProcess', 'invoiceCreation');
  console.log(`Server is listening on port: ${PORT}`);
});
