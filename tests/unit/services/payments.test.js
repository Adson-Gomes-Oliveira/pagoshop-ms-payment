const PaymentsServices = require('../../../src/services/payments.service');
const { Payments } = require('../../../src/database/models');
const {
  PAYMENT_MOCK_INSTANCE, PAYMENT_MOCK_PAYLOAD,
} = require('../../__mocks__/payments');
const HTTPStatus = require('../../../src/helpers/HTTP.status');

describe('Testing Payments Services', () => {
  const keyListOfPaymentInstance = Object.keys(PAYMENT_MOCK_INSTANCE);

  describe('GET: A list of payments', () => {
    beforeAll(() => {
      jest.spyOn(Payments, 'findAll').mockResolvedValueOnce([PAYMENT_MOCK_INSTANCE])
        .mockResolvedValue([]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const paymentList = await PaymentsServices.findAll();
      expect(paymentList).toBeInstanceOf(Array);
      keyListOfPaymentInstance.forEach((key) => {
        expect(paymentList[0]).toHaveProperty(key);
      });
    });

    it('should fail when no content is found', () => {
      try {
        PaymentsServices.findAll();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NO_CONTENT);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('GET: A payment', () => {
    beforeAll(() => {
      jest.spyOn(Payments, 'findByPk').mockImplementation(() => ({
        dataValues: { ...PAYMENT_MOCK_INSTANCE },
      }));
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const payment = await PaymentsServices.findById(PAYMENT_MOCK_INSTANCE.id);
      keyListOfPaymentInstance.forEach((key) => {
        if (key === 'cvv') return null;

        expect(payment).toHaveProperty(key);
        return null;
      });
    });

    it('should fail when no content is found', () => {
      try {
        PaymentsServices.findById();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NO_CONTENT);
        expect(error.message).toBe('Content not found');
      }
    });

    it('should fail when no id is provided', () => {
      try {
        PaymentsServices.findById();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('id not found');
      }
    });
  });

  describe('POST: A payment', () => {
    beforeAll(() => {
      jest.spyOn(Payments, 'create').mockResolvedValue(PAYMENT_MOCK_INSTANCE);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be created with success', async () => {
      const payment = await PaymentsServices.create(PAYMENT_MOCK_PAYLOAD);
      keyListOfPaymentInstance.forEach((key) => {
        expect(payment).toHaveProperty(key);
      });
    });

    it('should fail when validation is failing and throws 422 error', async () => {
      const { value: _, ...payloadWithoutValue } = PAYMENT_MOCK_PAYLOAD;

      try {
        await PaymentsServices.create(payloadWithoutValue);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.UN_ENTITY);
        expect(error.message).toBe('value is required');
      }
    });
  });

  describe('PATCH: A payment', () => {
    beforeAll(() => {
      jest.spyOn(Payments, 'update').mockResolvedValue([1]);
      jest.spyOn(Payments, 'findByPk').mockResolvedValue({ ...PAYMENT_MOCK_INSTANCE, status: 'CANCELED' });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be canceled with success', async () => {
      const payment = await PaymentsServices.cancelPayment(PAYMENT_MOCK_INSTANCE.id);
      expect(payment).toHaveProperty('status');
      expect(payment.status).toBe('CANCELED');
    });

    it('should fail when no id is provided', async () => {
      try {
        await PaymentsServices.cancelPayment();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('id not found');
      }
    });
  });
});
