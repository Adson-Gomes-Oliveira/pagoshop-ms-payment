const amqplib = require('amqplib');
const InvoicesServices = require('./invoices.service');

const createInvoiceByOrderAndPayment = async (queue, exchange) => {
  const connectionMQ = await amqplib.connect('amqp://guest:guest@rabbit-ms-gateway:5672');
  const consumerChannel = await connectionMQ.createChannel();
  await consumerChannel.bindQueue(queue, exchange, '');

  await consumerChannel.consume(queue, async (msg) => {
    const msgContent = msg.content.toString();
    const actualMessage = JSON.parse(msgContent);

    if (actualMessage) {
      const invoiceExist = await InvoicesServices.findByProcessHash(actualMessage.processHash);

      await InvoicesServices.updateInvoice(invoiceExist, actualMessage);
      consumerChannel.ack(msg);
    }
  });
};

module.exports = createInvoiceByOrderAndPayment;
