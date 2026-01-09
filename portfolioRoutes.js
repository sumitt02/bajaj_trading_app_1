/**
 * Portfolio Routes
 */
const express = require('express');
const router = express.Router();

function createPortfolioRoutes(portfolioController) {
  router.get('/', (req, res) => portfolioController.getUserPortfolio(req, res));
  return router;
}

module.exports = createPortfolioRoutes;
