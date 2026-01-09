/**
 * Order Model
 * Represents a buy or sell order placed by a user
 */
class Order {
  constructor(orderId, symbol, exchange, orderType, orderStyle, quantity, price, userId) {
    this.orderId = orderId;            // Unique order identifier
    this.symbol = symbol;               // Stock symbol
    this.exchange = exchange;           // Exchange name
    this.orderType = orderType;         // "BUY" or "SELL"
    this.orderStyle = orderStyle;      // "MARKET" or "LIMIT"
    this.quantity = quantity;           // Number of shares
    this.price = price;                 // Price per share (null for MARKET orders)
    this.status = "NEW";                // Order status: NEW, PLACED, EXECUTED, CANCELLED
    this.userId = userId;               // User who placed the order
    this.createdAt = new Date();        // Timestamp when order was created
    this.executedAt = null;             // Timestamp when order was executed
    this.executedPrice = null;          // Price at which order was executed
  }
}

module.exports = Order;
