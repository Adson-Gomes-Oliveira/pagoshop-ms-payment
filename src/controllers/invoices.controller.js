const InvoicesServices = require('../services/invoices.service');
const HTTPStatus = require('../helpers/HTTP.status');

const createInvoiceDefault = async (req, res) => {
  const response = await InvoicesServices.createInvoiceDefault();
  return res.status(HTTPStatus.CREATED).json(response);
};

const findByCPF = async (req, res) => {
  const payload = req.body;
  const response = await InvoicesServices.findByCPF(payload);

  return res.status(HTTPStatus.OK).json(response);
};

module.exports = {
  createInvoiceDefault,
  findByCPF,
};
