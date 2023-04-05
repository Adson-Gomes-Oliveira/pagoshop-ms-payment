const { Invoices } = require('../database/models');

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

const updateInvoice = async (id, payload) => {
  const response = await Invoices.update(
    { ...payload.messageContent },
    { where: { id } },
  );

  return response;
};

module.exports = {
  createInvoiceDefault,
  findByProcessHash,
  updateInvoice,
};
