/**
 * Order Service
 * Handles business logic for order management
 */
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');

class OrderService {
  constructor(instrumentService, tradeService, portfolioService) {
    // In-memory storage for orders
    this.orders = new Map();
    this.instrumentService = instrumentService;
    this.tradeService = tradeService;
    this.portfolioService = portfolioService;
  }

  /**
   * Place a new order
   */
  placeOrder(orderData, userId) {
    // Validate order data
    this.validateOrder(orderData);

    // Check if instrument exists
    const instrument = this.instrumentService.getInstrument(
      orderData.symbol,
      orderData.exchange
    );
    if (!instrument) {
      throw new Error(`Instrument ${orderData.symbol} not found on ${orderData.exchange}`);
    }

    // Create new order
    const orderId = uuidv4();
    const order = new Order(
      orderId,
      orderData.symbol,
      orderData.exchange,
      orderData.orderType,
      orderData.orderStyle,
      orderData.quantity,
      orderData.price || null,
      userId
    );

    // Store order
    this.orders.set(orderId, order);

    // Simulate order execution (in real system, this would be async)
    setTimeout(() => {
      this.executeOrder(orderId);
    }, 1000); // Execute after 1 second

    return order;
  }

  /**
   * Validate order data
   */
  validateOrder(orderData) {
    if (!orderData.symbol || !orderData.exchange) {
      throw new Error('Symbol and exchange are required');
    }

    if (!orderData.orderType || !['BUY', 'SELL'].includes(orderData.orderType)) {
      throw new Error('Order type must be BUY or SELL');
    }

    if (!orderData.orderStyle || !['MARKET', 'LIMIT'].includes(orderData.orderStyle)) {
      throw new Error('Order style must be MARKET or LIMIT');
    }

    if (!orderData.quantity || orderData.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (orderData.orderStyle === 'LIMIT' && (!orderData.price || orderData.price <= 0)) {
      throw new Error('Price is required for LIMIT orders and must be greater than 0');
    }
  }

  /**
   * Get order by ID
   */
  getOrder(orderId) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    return order;
  }

  /**
   * Get all orders for a user
   */
  getUserOrders(userId) {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  /**
   * Execute an order (simulate trade execution)
   */
  executeOrder(orderId) {
    const order = this.orders.get(orderId);
    if (!order || order.status !== 'NEW') {
      return;
    }

    // Update order status to PLACED
    order.status = 'PLACED';

    // Get current market price
    const instrument = this.instrumentService.getInstrument(order.symbol, order.exchange);
    let executionPrice;

    if (order.orderStyle === 'MARKET') {
      // Market order: execute at current market price
      executionPrice = instrument.lastTradedPrice;
    } else {
      // Limit order: execute at order price if market price is favorable
      // For simplicity, we'll execute if market price is within 5% of limit price
      const marketPrice = instrument.lastTradedPrice;
      if (order.orderType === 'BUY' && marketPrice <= order.price * 1.05) {
        executionPrice = Math.min(order.price, marketPrice);
      } else if (order.orderType === 'SELL' && marketPrice >= order.price * 0.95) {
        executionPrice = Math.max(order.price, marketPrice);
      } else {
        // Order cannot be executed at limit price
        return;
      }
    }

    // Execute the order
    order.status = 'EXECUTED';
    order.executedAt = new Date();
    order.executedPrice = executionPrice;

    // Create trade record
    this.tradeService.createTrade(order);

    // Update portfolio
    this.portfolioService.updatePortfolio(order, executionPrice);
  }

  /**
   * Cancel an order
   */
  cancelOrder(orderId, userId) {
    const order = this.getOrder(orderId);
    
    if (order.userId !== userId) {
      throw new Error('Unauthorized: Order does not belong to user');
    }

    if (order.status === 'EXECUTED') {
      throw new Error('Cannot cancel an executed order');
    }

    if (order.status === 'CANCELLED') {
      throw new Error('Order is already cancelled');
    }

    order.status = 'CANCELLED';
    return order;
  }
}

module.exports = OrderService;
