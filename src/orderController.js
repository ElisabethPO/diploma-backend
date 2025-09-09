import Order from './order.js';
import OrderService from './orderService.js';

class OrderController {
  async createOrder(req, res) {
    try {
      const { items } = req.body;
      const order = await OrderService.createOrder(items);
      res.status(201).json({ message: "Order successfully created", order });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await OrderService.updateOrderStatus(req.params.id, status);
      res.json({ message: "Order status updated", order });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const order = await Order.findByIdAndDelete(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ message: "The order has been successfully deleted." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error });
    }
  }
}

export default new OrderController();

