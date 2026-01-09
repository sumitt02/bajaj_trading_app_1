/**
 * Order Routes
 */
const express = require('express');
const router = express.Router();

function createOrderRoutes(orderController) {
  router.post('/', (req, res) => orderController.placeOrder(req, res));
  router.get('/', (req, res) => orderController.getUserOrders(req, res));
  router.get('/:orderId', (req, res) => orderController.getOrderStatus(req, res));
  router.delete('/:orderId', (req, res) => orderController.cancelOrder(req, res));
  return router;
}

module.exports = createOrderRoutes;
