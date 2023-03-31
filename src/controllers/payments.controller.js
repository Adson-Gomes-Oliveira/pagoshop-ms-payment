const database = require('../database/models');
const { Payments, Invoices } = require('../database/models');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/payment.validations');

const findAll = async (_req, res) => {
  const response = await Payments.findAll();
  return res.status(HTTPStatus.OK).json(response);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const response = await Payments.findByPk(id);
  const { cvv: _, ...responseWithoutCVV } = response.dataValues;

  return res.status(HTTPStatus.OK).json(responseWithoutCVV);
};

const create = async (req, res) => {
  const payload = req.body;
  payload.expirationDate = new Date(payload.expirationDate);

  validate.payloadValidation(payload);

  const response = await Payments.create(payload);
  return res
    .status(HTTPStatus.CREATED)
    .header({ location: `/api/payments/${response.id}` })
    .json(response);
};

const confirmPayment = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  validate.confirmPaymentValidation(payload);

  database.sequelize.transaction(async (t) => {
    await Payments.update(
      { status: 'CONFIRMED' },
      { where: { id } },
      { transaction: t },
    );

    const response = await Invoices.create(payload, { transaction: t });
    return res.status(HTTPStatus.OK).json(response);
  });
};

const cancelPayment = async (req, res) => {
  const { id } = req.params;

  database.sequelize.transaction(async (t) => {
    await Payments.update(
      { status: 'CANCELED' },
      { where: { id } },
      { transaction: t },
    );
    const paymentCanceled = await Payments.findByPk(id);

    return res.status(HTTPStatus.OK).json({
      id: paymentCanceled.id,
      status: paymentCanceled.status,
    });
  });
};

module.exports = {
  findAll,
  findById,
  create,
  confirmPayment,
  cancelPayment,
};
