/**
 * Portfolio Model
 * Represents a user's holding of a particular stock
 */
class Portfolio {
  constructor(symbol, exchange, quantity, averagePrice, currentPrice) {
    this.symbol = symbol;               // Stock symbol
    this.exchange = exchange;           // Exchange name
    this.quantity = quantity;           // Number of shares held
    this.averagePrice = averagePrice;   // Average purchase price
    this.currentValue = quantity * currentPrice; // Current market value
  }
}

module.exports = Portfolio;
