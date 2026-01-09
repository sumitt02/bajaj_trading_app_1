/**
 * Instrument Service
 * Handles business logic for financial instruments
 */
class InstrumentService {
  constructor() {
    // In-memory storage for instruments (simulating a database)
    this.instruments = [];
    this.initializeInstruments();
  }

  /**
   * Initialize with sample instruments
   */
  initializeInstruments() {
    this.instruments = [
      { symbol: "RELIANCE", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 2450.50 },
      { symbol: "TCS", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 3420.75 },
      { symbol: "INFY", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 1520.25 },
      { symbol: "HDFCBANK", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 1680.00 },
      { symbol: "ICICIBANK", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 980.50 },
      { symbol: "BHARTIARTL", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 1120.75 },
      { symbol: "SBIN", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 625.25 },
      { symbol: "WIPRO", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 485.50 },
      { symbol: "HCLTECH", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 1320.00 },
      { symbol: "LT", exchange: "NSE", instrumentType: "EQUITY", lastTradedPrice: 3425.75 }
    ];
  }

  /**
   * Get all available instruments
   */
  getAllInstruments() {
    return this.instruments;
  }

  /**
   * Get instrument by symbol and exchange
   */
  getInstrument(symbol, exchange) {
    return this.instruments.find(
      inst => inst.symbol === symbol && inst.exchange === exchange
    );
  }

  /**
   * Update instrument price (simulating market price changes)
   */
  updatePrice(symbol, exchange, newPrice) {
    const instrument = this.getInstrument(symbol, exchange);
    if (instrument) {
      instrument.lastTradedPrice = newPrice;
    }
    return instrument;
  }
}

module.exports = InstrumentService;
