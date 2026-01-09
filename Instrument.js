/**
 * Instrument Model
 * Represents a financial instrument (stock, equity) that can be traded
 */
class Instrument {
  constructor(symbol, exchange, instrumentType, lastTradedPrice) {
    this.symbol = symbol;              // Stock symbol (e.g., "RELIANCE", "TCS")
    this.exchange = exchange;          // Exchange name (e.g., "NSE", "BSE")
    this.instrumentType = instrumentType; // Type (e.g., "EQUITY", "FUTURES")
    this.lastTradedPrice = lastTradedPrice; // Current market price
  }
}

module.exports = Instrument;
