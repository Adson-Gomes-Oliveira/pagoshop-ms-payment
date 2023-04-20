const { Invoices } = require('../database/models');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const emailSender = require('./emailSender.service');
const generatePDF = require('../helpers/create.pdf');

const findByCPF = async (payload) => {
  const response = await Invoices.findAll({ where: { cpf: payload.cpf } });

  if (response.length === 0) throw CustomError('Content not found', HTTPStatus.NO_CONTENT);
  return response;
};

const createInvoiceDefault = async () => {
  const response = await Invoices.create({
    email: '',
    name: '',
    cpf: '',
    buyerAddress: {},
    productsOrdered: [],
    status: 'CREATING',
  });

  return response;
};

const updateInvoice = async (id, payload) => {
  if (!id || !payload) throw CustomError('id or payload not found', HTTPStatus.BAD_REQUEST);

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

    const pdfContent = await generatePDF(invoiceUpdated.dataValues);
    await emailSender(invoiceUpdated.dataValues.email, pdfContent);
  }

  return response;
};

module.exports = {
  findByCPF,
  createInvoiceDefault,
  updateInvoice,
};
