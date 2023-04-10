const InvoicesServices = require('../../../src/services/invoices.service');
const InvoicesControllers = require('../../../src/controllers/invoices.controller');
const {
  INVOICE_MOCK_INSTANCE,
  INVOICE_MOCK_PAYLOAD,
  DEFAULT_INVOICE_MOCK_INSTANCE,
} = require('../../mocks/invoices');
const HTTPStatus = require('../../../src/helpers/HTTP.status');

describe('Testing Payments Controllers', () => {
  const request = {};
  const response = {};

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue();

    jest.spyOn(InvoicesServices, 'findByCPF').mockResolvedValue([INVOICE_MOCK_INSTANCE]);
    jest.spyOn(InvoicesServices, 'createInvoiceDefault').mockResolvedValue(DEFAULT_INVOICE_MOCK_INSTANCE);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: When a list of invoices by CPF is requested the status code 200 must be returned', async () => {
    await InvoicesControllers.findByCPF(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith([INVOICE_MOCK_INSTANCE]);
  });

  it('POST: When a default invoice is created the status code 201 must be returned', async () => {
    request.body = INVOICE_MOCK_PAYLOAD;

    await InvoicesControllers.createInvoiceDefault(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.CREATED);
    expect(response.json).toHaveBeenCalledWith(DEFAULT_INVOICE_MOCK_INSTANCE);
  });
});
