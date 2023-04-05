const amqplib = require('amqplib');

const rabbitMQCustomPayment = async (queue, exchange) => {
  const connectionMQ = await amqplib.connect('amqp://guest:guest@rabbit-ms-gateway:5672');
  const consumerChannel = await connectionMQ.createChannel();
  await consumerChannel.bindQueue(queue, exchange, '');

  let paymentData = {};

  await consumerChannel.consume(queue, async (msg) => {
    const msgContent = msg.content.toString();
    const actualMessage = JSON.parse(msgContent);
    paymentData = actualMessage.paymentData;
    console.log(paymentData);
  });
};

module.exports = rabbitMQCustomPayment;
