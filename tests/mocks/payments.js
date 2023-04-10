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

const INVOICE_MOCK_INSTANCE = {
  id: 1,
  name: 'Larissa Velch',
  cpf: '98845671466',
  status: 'CREATED',
  buyerAddress: {
    street: 'no_street',
    number: 'no_number',
    cep: 'no_cep',
    more_info: 'no_info',
    city: 'no_city',
    state: 'SP',
  },
  productsOrdered: [
    {
      product: 'Samsung S20 FE',
      quantity: 10,
      price: 1500,
    },
  ],
  paymentId: 1,
};

const INVOICE_MOCK_PAYLOAD = {
  name: 'Larissa Velch',
  cpf: '98845671466',
  status: 'CREATED',
  buyerAddress: {
    street: 'no_street',
    number: 'no_number',
    cep: 'no_cep',
    more_info: 'no_info',
    city: 'no_city',
    state: 'SP',
  },
  productsOrdered: [
    {
      product: 'Samsung S20 FE',
      quantity: 10,
      price: 1500,
    },
  ],
  paymentId: 1,
};

module.exports = {
  PAYMENT_MOCK_INSTANCE,
  PAYMENT_MOCK_PAYLOAD,
  INVOICE_MOCK_INSTANCE,
  INVOICE_MOCK_PAYLOAD,
};
