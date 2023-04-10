const { Router } = require('express');
const paymentController = require('../controllers/payments.controller');
const statusMiddleware = require('../middlewares/status.middleware');

const route = Router();

route.get('/', paymentController.findAll);
route.get('/:id', paymentController.findById);
route.post('/', paymentController.create);
route.patch('/cancel/:id', statusMiddleware, paymentController.cancelPayment);

module.exports = route;
