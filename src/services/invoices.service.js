const { Invoices } = require('../database/models');

const findByCPF = async (cpf) => {
  const response = await Invoices.find({ where: { cpf } });
  return response;
};

const createInvoiceDefault = async () => {
  const response = await Invoices.create({
    name: '',
    cpf: '',
    buyerAddress: {},
    productsOrdered: [],
    status: 'CREATING',
  });

  return response;
};

const updateInvoice = async (id, payload) => {
  const response = await Invoices.update(
    { ...payload.messageContent },
    { where: { id } },
  );

  const invoiceUpdated = await Invoices.findByPk(id);

  if (
    !Object.values(invoiceUpdated.dataValues).includes('')
    && invoiceUpdated.dataValues.productsOrdered.length > 0
    && Object.keys(invoiceUpdated.dataValues.buyerAddress).length > 0
  ) {
    await Invoices.update(
      { status: 'CREATED' },
      { where: { id: invoiceUpdated.id } },
    );
  }

  return response;
};

module.exports = {
  findByCPF,
  createInvoiceDefault,
  updateInvoice,
};
