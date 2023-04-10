const JOI = require('joi');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const payloadValidation = (payload) => {
  const { error } = JOI.object({
    value: JOI.number().required(),
    buyerName: JOI.string().required(),
    cardNumber: JOI.string().required(),
    expirationDate: JOI.date().required(),
    cvv: JOI.string().required(),
  }).validate(payload);

  if (error) throw customError(error.message.replace(/\\|"/g, ''), HTTPStatus.UN_ENTITY);
  return null;
};

module.exports = {
  payloadValidation,
};
