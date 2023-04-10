const { Payments } = require('../database/models');
const database = require('../database/models');
const validate = require('../validations/payment.validations');

const findAll = async () => {
  const response = await Payments.findAll();
  return response;
};

const findById = async (id) => {
  const response = await Payments.findByPk(id);
  const { cvv: _, ...responseWithoutCVV } = response.dataValues;

  return responseWithoutCVV;
};

const create = async (payload) => {
  const newPayload = {
    ...payload,
    expirationDate: new Date(payload.expirationDate),
  };

  validate.payloadValidation(newPayload);

  const response = await Payments.create(newPayload);
  return response;
};

const cancelPayment = async (id) => {
  const transaction = database.sequelize.transaction(async (t) => {
    await Payments.update(
      { status: 'CANCELED' },
      { where: { id } },
      { transaction: t },
    );
    const paymentCanceled = await Payments.findByPk(id);

    return paymentCanceled;
  });

  return transaction;
};

module.exports = {
  findAll,
  findById,
  create,
  cancelPayment,
};
