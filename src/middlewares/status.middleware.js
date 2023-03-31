const { Payments } = require('../database/models');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const statusMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const payment = await Payments.findByPk(id);

  if (payment.status === 'CONFIRMED' || payment.status === 'CANCELED') {
    throw customError('The payment status can not be changed, is already confirmed or canceled', HTTPStatus.BAD_REQUEST);
  }

  if (payment.status !== 'CREATED') {
    throw customError('Invalid Status !', HTTPStatus.UN_ENTITY);
  }

  next();
};

module.exports = statusMiddleware;
