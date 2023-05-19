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

const DEFAULT_INVOICE_MOCK_INSTANCE = {
  id: 1,
  name: '',
  cpf: '',
  status: 'CREATED',
  buyerAddress: {},
  productsOrdered: [],
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

const MESSAGE_MOCK_TO_INVOICE = {
  messageContent: {
    productsOrdered: INVOICE_MOCK_INSTANCE.productsOrdered,
  },
};

module.exports = {
  INVOICE_MOCK_INSTANCE,
  INVOICE_MOCK_PAYLOAD,
  DEFAULT_INVOICE_MOCK_INSTANCE,
  MESSAGE_MOCK_TO_INVOICE,
};
