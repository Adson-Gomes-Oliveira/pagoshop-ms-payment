const PaymentsServices = require('../services/payments.service');
const HTTPStatus = require('../helpers/HTTP.status');

const findAll = async (_req, res) => {
  const response = await PaymentsServices.findAll();
  return res.status(HTTPStatus.OK).json(response);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const response = await PaymentsServices.findById(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;

  const response = await PaymentsServices.create(payload);
  return res
    .status(HTTPStatus.CREATED)
    .header({ location: `/api/payments/${response.id}` })
    .json(response);
};

const cancelPayment = async (req, res) => {
  const { id } = req.params;

  const response = await PaymentsServices.cancelPayment(id);
  return res.status(HTTPStatus.OK).json({
    id: response.id,
    status: response.status,
  });
};

module.exports = {
  findAll,
  findById,
  create,
  cancelPayment,
};
