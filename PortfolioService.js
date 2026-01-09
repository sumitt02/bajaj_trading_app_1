/**
 * Portfolio Service
 * Handles business logic for user portfolio holdings
 */
const Portfolio = require('../models/Portfolio');
const InstrumentService = require('./InstrumentService');

class PortfolioService {
  constructor(instrumentService) {
    // In-memory storage: Map<userId, Map<symbol+exchange, Portfolio>>
    this.holdings = new Map();
    this.instrumentService = instrumentService;
  }

  /**
   * Update portfolio after a trade execution
   */
  updatePortfolio(order, executionPrice) {
    const userId = order.userId;
    const key = `${order.symbol}_${order.exchange}`;

    // Initialize user holdings if not exists
    if (!this.holdings.has(userId)) {
      this.holdings.set(userId, new Map());
    }

    const userHoldings = this.holdings.get(userId);
    const instrument = this.instrumentService.getInstrument(order.symbol, order.exchange);

    if (order.orderType === 'BUY') {
      // Buying: Add to holdings
      if (userHoldings.has(key)) {
        const holding = userHoldings.get(key);
        const totalCost = (holding.quantity * holding.averagePrice) + (order.quantity * executionPrice);
        holding.quantity += order.quantity;
        holding.averagePrice = totalCost / holding.quantity;
        holding.currentValue = holding.quantity * instrument.lastTradedPrice;
      } else {
        // New holding
        const holding = new Portfolio(
          order.symbol,
          order.exchange,
          order.quantity,
          executionPrice,
          instrument.lastTradedPrice
        );
        userHoldings.set(key, holding);
      }
    } else {
      // Selling: Reduce holdings
      if (userHoldings.has(key)) {
        const holding = userHoldings.get(key);
        if (holding.quantity < order.quantity) {
          throw new Error('Insufficient holdings to sell');
        }
        holding.quantity -= order.quantity;
        if (holding.quantity === 0) {
          userHoldings.delete(key);
        } else {
          holding.currentValue = holding.quantity * instrument.lastTradedPrice;
        }
      } else {
        throw new Error('No holdings found to sell');
      }
    }
  }

  /**
   * Get portfolio for a user
   */
  getUserPortfolio(userId) {
    if (!this.holdings.has(userId)) {
      return [];
    }

    const userHoldings = this.holdings.get(userId);
    const portfolio = [];

    // Update current values based on latest market prices
    for (const [key, holding] of userHoldings.entries()) {
      const instrument = this.instrumentService.getInstrument(holding.symbol, holding.exchange);
      if (instrument) {
        holding.currentValue = holding.quantity * instrument.lastTradedPrice;
        portfolio.push({
          symbol: holding.symbol,
          exchange: holding.exchange,
          quantity: holding.quantity,
          averagePrice: holding.averagePrice,
          currentValue: holding.currentValue
        });
      }
    }

    return portfolio;
  }
}

module.exports = PortfolioService;
