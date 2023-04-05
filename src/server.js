/* eslint-disable no-console */
const app = require('./app');
const rabbitMQCustomConsumer = require('./helpers/rabbitMQConsumer');
require('dotenv').config();

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  rabbitMQCustomConsumer('invoiceCreation', 'orderConfirmation');
  console.log(`Server is listening on port: ${PORT}`);
});
