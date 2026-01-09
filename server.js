/**
 * Main Server File
 * Entry point for the Trading API SDK
 */
const express = require('express');
const cors = require('cors');

// Import services
const InstrumentService = require('./services/InstrumentService');
const TradeService = require('./services/TradeService');
const PortfolioService = require('./services/PortfolioService');
const OrderService = require('./services/OrderService');

// Import controllers
const InstrumentController = require('./controllers/InstrumentController');
const OrderController = require('./controllers/OrderController');
const TradeController = require('./controllers/TradeController');
const PortfolioController = require('./controllers/PortfolioController');

// Import routes
const createInstrumentRoutes = require('./routes/instrumentRoutes');
const createOrderRoutes = require('./routes/orderRoutes');
const createTradeRoutes = require('./routes/tradeRoutes');
const createPortfolioRoutes = require('./routes/portfolioRoutes');

// Import middleware
const mockAuth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Initialize services (dependency injection)
const instrumentService = new InstrumentService();
const tradeService = new TradeService();
const portfolioService = new PortfolioService(instrumentService);
const orderService = new OrderService(instrumentService, tradeService, portfolioService);

// Initialize controllers
const instrumentController = new InstrumentController(instrumentService);
const orderController = new OrderController(orderService);
const tradeController = new TradeController(tradeService);
const portfolioController = new PortfolioController(portfolioService);

// API Routes
app.use('/api/v1/instruments', createInstrumentRoutes(instrumentController));
app.use('/api/v1/orders', mockAuth, createOrderRoutes(orderController));
app.use('/api/v1/trades', mockAuth, createTradeRoutes(tradeController));
app.use('/api/v1/portfolio', mockAuth, createPortfolioRoutes(portfolioController));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Trading API SDK is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Bajaj Trading API SDK',
    version: '1.0.0',
    endpoints: {
      instruments: '/api/v1/instruments',
      orders: '/api/v1/orders',
      trades: '/api/v1/trades',
      portfolio: '/api/v1/portfolio'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Trading API SDK server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: See README.md for details`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
