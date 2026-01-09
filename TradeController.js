/**
 * Trade Controller
 * Handles HTTP requests for trade-related operations
 */
class TradeController {
  constructor(tradeService) {
    this.tradeService = tradeService;
  }

  /**
   * GET /api/v1/trades
   * Get all executed trades for the current user
   */
  getUserTrades(req, res) {
    try {
      const userId = req.userId;
      const trades = this.tradeService.getUserTrades(userId);
      
      res.status(200).json({
        success: true,
        data: trades,
        count: trades.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trades',
        error: error.message
      });
    }
  }
}

module.exports = TradeController;
