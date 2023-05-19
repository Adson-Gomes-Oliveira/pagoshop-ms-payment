const PAYMENT_MOCK_INSTANCE = {
  id: 1,
  value: 655.99,
  buyerName: 'Larissa Velch',
  cardNumber: '2587964537581472',
  expirationDate: new Date('2020-08'),
  cvv: '657',
  status: 'CREATED',
  transactDate: new Date('2021-10-12'),
};

const PAYMENT_MOCK_PAYLOAD = {
  value: 655.99,
  buyerName: 'Larissa Velch',
  cardNumber: '2587964537581472',
  expirationDate: '2020-08',
  cvv: '657',
};

module.exports = {
  PAYMENT_MOCK_INSTANCE,
  PAYMENT_MOCK_PAYLOAD,
};
