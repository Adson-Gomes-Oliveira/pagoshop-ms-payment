const InvoicesServices = require('../../../src/services/invoices.service');
const { Invoices } = require('../../../src/database/models');
const {
  INVOICE_MOCK_INSTANCE,
  INVOICE_MOCK_PAYLOAD,
  DEFAULT_INVOICE_MOCK_INSTANCE,
  MESSAGE_MOCK_TO_INVOICE,
} = require('../../mocks/invoices');
const HTTPStatus = require('../../../src/helpers/HTTP.status');

describe('Testing Payments Services', () => {
  const keyListOfInvoiceInstance = Object.keys(INVOICE_MOCK_INSTANCE);

  describe('GET: A list of invoices based on cpf', () => {
    beforeAll(() => {
      jest.spyOn(Invoices, 'findAll').mockResolvedValueOnce([INVOICE_MOCK_INSTANCE])
        .mockResolvedValue([]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const invoiceList = await InvoicesServices.findByCPF(INVOICE_MOCK_PAYLOAD);
      expect(invoiceList).toBeInstanceOf(Array);
      keyListOfInvoiceInstance.forEach((key) => {
        expect(invoiceList[0]).toHaveProperty(key);
      });
    });

    it('should fail when no content is found', async () => {
      try {
        await InvoicesServices.findByCPF(INVOICE_MOCK_INSTANCE);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NO_CONTENT);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('POST: A default invoice', () => {
    beforeAll(() => {
      jest.spyOn(Invoices, 'create').mockResolvedValue(DEFAULT_INVOICE_MOCK_INSTANCE);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be created with success', async () => {
      const payment = await InvoicesServices.createInvoiceDefault();
      keyListOfInvoiceInstance.forEach((key) => {
        if (key === 'paymentId') return null;

        expect(payment).toHaveProperty(key);
        return null;
      });
    });
  });

  describe('PUT: A invoice', () => {
    beforeAll(() => {
      jest.spyOn(Invoices, 'update').mockResolvedValueOnce(INVOICE_MOCK_INSTANCE)
        .mockResolvedValue([1]);

      jest.spyOn(Invoices, 'findByPk').mockImplementation(() => ({
        dataValues: { ...INVOICE_MOCK_INSTANCE },
      }));
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be updated with success', async () => {
      const payment = await InvoicesServices
        .updateInvoice(INVOICE_MOCK_INSTANCE.id, MESSAGE_MOCK_TO_INVOICE);

      expect(payment).toHaveProperty('productsOrdered');
      expect(payment.productsOrdered).toBeInstanceOf(Array);
    });

    it('should fail when no id or payload is provided', async () => {
      try {
        await InvoicesServices.updateInvoice();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('id or payload not found');
      }
    });
  });
});
