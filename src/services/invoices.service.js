const { Invoices } = require('../database/models');
const sendPaymentToInvoice = require('./sendPaymentToInvoice.producer.service');

const findByProcessHash = async (processHash) => {
  const response = await Invoices.findOne({ where: { processHash } });
  return response;
};

const createInvoiceDefault = async (payload) => {
  const response = await Invoices.create({
    processHash: payload.processHash,
    name: '',
    cpf: '',
    buyerAddress: {},
    productsOrdered: [],
  });

  const updateInvoice = await Invoices.update(
    { ...payload.messageContent },
    { where: { id: response.id } },
  );

  return updateInvoice;
};

const updateInvoice = async (invoiceExist, payload) => {
  if (!invoiceExist) {
    const defaultInvoice = await createInvoiceDefault(payload);
    return defaultInvoice;
  }

  const response = await Invoices.update(
    { ...payload.messageContent },
    { where: { id: invoiceExist.id } },
  );

  const invoiceUpdated = await Invoices.findByPk(invoiceExist.id);

  if (
    !Object.values(invoiceUpdated.dataValues).includes('')
    && invoiceUpdated.dataValues.productsOrdered.length > 0
    && Object.keys(invoiceUpdated.dataValues.buyerAddress).length > 0
  ) {
    sendPaymentToInvoice('invoiceDelivery', invoiceUpdated.dataValues);
  }

  return response;
};

module.exports = {
  createInvoiceDefault,
  findByProcessHash,
  updateInvoice,
};
