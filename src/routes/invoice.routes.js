const { Router } = require('express');
const invoiceControllers = require('../controllers/invoices.controller');

const router = Router();

router.get('/', invoiceControllers.createInvoiceDefault);
router.post('/findByCPF', invoiceControllers.findByCPF);

module.exports = router;
