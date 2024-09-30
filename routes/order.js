const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// Create a new order
router.post('/create', orderController.createOrder);

// Get all orders for a specific user
router.get('/user/:userId', orderController.getUserOrders);

// Get details of a specific order
router.get('/:orderId', orderController.getOrderById);

// Update order status
router.put('/:orderId/status', orderController.updateOrderStatus);

// Delete an order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
