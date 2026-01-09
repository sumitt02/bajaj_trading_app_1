/**
 * Trade Routes
 */
const express = require('express');
const router = express.Router();

function createTradeRoutes(tradeController) {
  router.get('/', (req, res) => tradeController.getUserTrades(req, res));
  return router;
}

module.exports = createTradeRoutes;
