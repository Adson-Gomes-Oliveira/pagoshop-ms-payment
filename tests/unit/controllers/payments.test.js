const PaymentsServices = require('../../../src/services/payments.service');
const PaymentsControllers = require('../../../src/controllers/payments.controller');
const {
  PAYMENT_MOCK_INSTANCE, PAYMENT_MOCK_PAYLOAD,
} = require('../../__mocks__/payments');
const HTTPStatus = require('../../../src/helpers/HTTP.status');

describe('Testing Payments Controllers', () => {
  const request = {};
  const response = {};

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue();
    response.header = jest.fn().mockReturnValue(response);

    jest.spyOn(PaymentsServices, 'findAll').mockResolvedValue([PAYMENT_MOCK_INSTANCE]);
    jest.spyOn(PaymentsServices, 'findById').mockResolvedValue(PAYMENT_MOCK_INSTANCE);
    jest.spyOn(PaymentsServices, 'create').mockResolvedValue(PAYMENT_MOCK_INSTANCE);
    jest.spyOn(PaymentsServices, 'cancelPayment').mockResolvedValue({ ...PAYMENT_MOCK_INSTANCE, status: 'CANCELED' });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: When a list of payments is requested the status code 200 must be returned', async () => {
    await PaymentsControllers.findAll(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith([PAYMENT_MOCK_INSTANCE]);
  });

  it('GET: When a payment is requested the status code 200 must be returned', async () => {
    request.params = { id: PAYMENT_MOCK_INSTANCE.id };

    await PaymentsControllers.findById(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith(PAYMENT_MOCK_INSTANCE);
  });

  it('POST: When a payment is created the status code 201 must be returned', async () => {
    request.body = PAYMENT_MOCK_PAYLOAD;

    await PaymentsControllers.create(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.CREATED);
    expect(response.header).toHaveBeenCalledWith({ location: `/api/payments/${PAYMENT_MOCK_INSTANCE.id}` });
    expect(response.json).toHaveBeenCalledWith(PAYMENT_MOCK_INSTANCE);
  });

  it('PATCH: When a payment is canceled the status code 200 must be returned', async () => {
    request.params = { id: PAYMENT_MOCK_INSTANCE.id };

    await PaymentsControllers.cancelPayment(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith(PAYMENT_MOCK_INSTANCE);
  });
});
