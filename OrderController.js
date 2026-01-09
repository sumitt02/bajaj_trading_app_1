/**
 * Order Controller
 * Handles HTTP requests for order-related operations
 */
class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  /**
   * POST /api/v1/orders
   * Place a new order
   */
  placeOrder(req, res) {
    try {
      const userId = req.userId; // From authentication middleware
      const order = this.orderService.placeOrder(req.body, userId);
      
      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to place order',
        error: error.message
      });
    }
  }

  /**
   * GET /api/v1/orders/:orderId
   * Get order status by ID
   */
  getOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const order = this.orderService.getOrder(orderId);
      
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
        error: error.message
      });
    }
  }

  /**
   * GET /api/v1/orders
   * Get all orders for the current user
   */
  getUserOrders(req, res) {
    try {
      const userId = req.userId;
      const orders = this.orderService.getUserOrders(userId);
      
      res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  }

  /**
   * DELETE /api/v1/orders/:orderId
   * Cancel an order
   */
  cancelOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.userId;
      const order = this.orderService.cancelOrder(orderId, userId);
      
      res.status(200).json({
        success: true,
        message: 'Order cancelled successfully',
        data: order
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 
                        error.message.includes('Unauthorized') ? 403 : 400;
      res.status(statusCode).json({
        success: false,
        message: 'Failed to cancel order',
        error: error.message
      });
    }
  }
}

module.exports = OrderController;
