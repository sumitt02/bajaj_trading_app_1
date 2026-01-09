/**
 * Trade Model
 * Represents an executed trade (completed order)
 */
class Trade {
  constructor(tradeId, orderId, symbol, exchange, orderType, quantity, executedPrice, userId) {
    this.tradeId = tradeId;            // Unique trade identifier
    this.orderId = orderId;            // Original order ID
    this.symbol = symbol;               // Stock symbol
    this.exchange = exchange;           // Exchange name
    this.orderType = orderType;        // "BUY" or "SELL"
    this.quantity = quantity;           // Number of shares traded
    this.executedPrice = executedPrice; // Price at which trade was executed
    this.userId = userId;               // User who made the trade
    this.executedAt = new Date();       // Timestamp when trade was executed
  }
}

module.exports = Trade;
