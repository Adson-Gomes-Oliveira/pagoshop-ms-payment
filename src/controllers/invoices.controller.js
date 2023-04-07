const InvoicesServices = require('../services/invoices.service');
const HTTPStatus = require('../helpers/HTTP.status');

const createInvoiceDefault = async (req, res) => {
  const response = await InvoicesServices.createInvoiceDefault();
  return res.status(HTTPStatus.CREATED).json(response);
};

module.exports = {
  createInvoiceDefault,
};
