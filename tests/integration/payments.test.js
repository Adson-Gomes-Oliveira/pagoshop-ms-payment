const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const {
  PAYMENT_MOCK_INSTANCE,
  PAYMENT_MOCK_PAYLOAD,
  INVOICE_MOCK_INSTANCE,
  INVOICE_MOCK_PAYLOAD,
} = require('../mocks/payments');

describe('Testing Payments CRUD', () => {
  const paymentInstanceKeys = Object.keys(PAYMENT_MOCK_INSTANCE);
  const invoiceInstanceKeys = Object.keys(INVOICE_MOCK_INSTANCE);
  let paymentIdCreated = '';

  it('A list of all payments should be returned', async () => {
    const response = await request(app)
      .get('/api/payments')
      .expect(HTTPStatus.OK);

    paymentInstanceKeys.forEach((key) => {
      expect(response.body[0]).toHaveProperty(key);
    });
  });

  it('A payment should be created', async () => {
    const response = await request(app)
      .post('/api/payments')
      .send(PAYMENT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const recover = await request(app)
      .get(`/api/payments/${response.body.id}`)
      .expect(HTTPStatus.OK);

    // eslint-disable-next-line consistent-return
    paymentInstanceKeys.forEach((key) => {
      if (key === 'status') return expect(recover.body).toHaveProperty(key);
      if (key === 'transactDate') return expect(recover.body).toHaveProperty(key);
      expect(response.body).toHaveProperty(key);
    });
    expect(recover.body.status).toBe('CREATED');
    paymentIdCreated = response.body.id;
  });

  it('A payment should be confirmed', async () => {
    const response = await request(app)
      .post(`/api/payments/confirm/${paymentIdCreated}`)
      .send(INVOICE_MOCK_PAYLOAD);

    invoiceInstanceKeys.forEach((key) => {
      expect(response.body).toHaveProperty(key);
    });
  });

  it('A payment should be canceled', async () => {
    const response = await request(app)
      .post('/api/payments')
      .send(PAYMENT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const responsePatch = await request(app)
      .patch(`/api/payments/cancel/${response.body.id}`)
      .expect(HTTPStatus.OK);

    expect(responsePatch.body.status).toBe('CANCELED');
  });
});
