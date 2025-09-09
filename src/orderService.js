import Order from './order.js';

class OrderService {
  async createOrder(items) {
    if (!items || items.length === 0) {
      throw new Error("Cart is empty");
    }

    const totalPrice = items.reduce((total, product) => {
      const productPrice = 100;
      return total + productPrice * product.quantity;
    }, 0);

    const order = new Order({
      products: items,
      totalPrice: totalPrice,
    });

    return await order.save();
  }

  async getAllOrders() {
    return await Order.find().sort({ createdAt: -1 });
  }

  async getOrderById(orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Заказ не найден");
    }
    return order;
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      throw new Error("Заказ не найден");
    }
    return order;
  }
}

export default new OrderService();

