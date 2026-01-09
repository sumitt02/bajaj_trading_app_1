/**
 * Portfolio Controller
 * Handles HTTP requests for portfolio-related operations
 */
class PortfolioController {
  constructor(portfolioService) {
    this.portfolioService = portfolioService;
  }

  /**
   * GET /api/v1/portfolio
   * Get current portfolio holdings for the current user
   */
  getUserPortfolio(req, res) {
    try {
      const userId = req.userId;
      const portfolio = this.portfolioService.getUserPortfolio(userId);
      
      res.status(200).json({
        success: true,
        data: portfolio,
        count: portfolio.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch portfolio',
        error: error.message
      });
    }
  }
}

module.exports = PortfolioController;
