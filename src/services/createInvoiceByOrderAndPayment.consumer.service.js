const amqplib = require('amqplib');
const InvoicesServices = require('./invoices.service');
require('dotenv').config();

const RABBIT_MQ_CONNECT = process.env.RABBIT_STRING || 'amqp://guest:guest@rabbit-ms-gateway:5672';

const createInvoiceByOrderAndPayment = async (queue, exchange) => {
  const connectionMQ = await amqplib.connect(RABBIT_MQ_CONNECT);
  const consumerChannel = await connectionMQ.createChannel();
  await consumerChannel.assertExchange(exchange, 'fanout', { durable: true });
  await consumerChannel.assertQueue(queue, { durable: true });
  await consumerChannel.bindQueue(queue, exchange, '');

  await consumerChannel.consume(queue, async (msg) => {
    const msgContent = msg.content.toString();
    const actualMessage = JSON.parse(msgContent);
    const { invoiceId: _, ...messageWithoutInvoiceId } = actualMessage;

    if (actualMessage) {
      await InvoicesServices.updateInvoice(actualMessage.invoiceId, messageWithoutInvoiceId);
      consumerChannel.ack(msg);
    }
  });
};

module.exports = createInvoiceByOrderAndPayment;
