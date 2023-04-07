const { Router } = require('express');
const invoiceControllers = require('../controllers/invoices.controller');

const router = Router();

router.get('/', invoiceControllers.createInvoiceDefault);

module.exports = router;
