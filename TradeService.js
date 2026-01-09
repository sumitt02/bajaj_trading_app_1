/**
 * Trade Service
 * Handles business logic for executed trades
 */
const { v4: uuidv4 } = require('uuid');
const Trade = require('../models/Trade');

class TradeService {
  constructor() {
    // In-memory storage for trades
    this.trades = [];
  }

  /**
   * Create a trade from an executed order
   */
  createTrade(order) {
    const trade = new Trade(
      uuidv4(),
      order.orderId,
      order.symbol,
      order.exchange,
      order.orderType,
      order.quantity,
      order.executedPrice,
      order.userId
    );

    this.trades.push(trade);
    return trade;
  }

  /**
   * Get all trades for a user
   */
  getUserTrades(userId) {
    return this.trades.filter(trade => trade.userId === userId);
  }

  /**
   * Get trade by ID
   */
  getTrade(tradeId) {
    const trade = this.trades.find(t => t.tradeId === tradeId);
    if (!trade) {
      throw new Error(`Trade ${tradeId} not found`);
    }
    return trade;
  }
}

module.exports = TradeService;
