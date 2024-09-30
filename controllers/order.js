const db = require('../config/db'); // Import the database configuration

// Create a new order and add items to it
exports.createOrder = async (req, res) => {
    const { user_id, items } = req.body; // Expect items to be an array of menu product objects { menu_product_id, quantity }
    
    try {
        // Calculate the total price for the order
        let orderTotal = 0;
        for (let item of items) {
            const [product] = await db.execute('SELECT price FROM menu_products WHERE id = ?', [item.menu_product_id]);
            if (product.length === 0) {
                return res.status(400).json({ message: `Product with ID ${item.menu_product_id} not found.` });
            }
            item.price = product[0].price; // Add price to the item object
            item.total_price = item.price * item.quantity; // Calculate total price for the item
            orderTotal += item.total_price; // Add to order total
        }

        // Insert a new order into the orders table
        const [result] = await db.execute(
            'INSERT INTO orders (user_id, order_total, status) VALUES (?, ?, ?)',
            [user_id, orderTotal, 'Pending']
        );

        const orderId = result.insertId; // Get the ID of the newly created order

        // Insert each item into the order_items table
        for (let item of items) {
            await db.execute(
                'INSERT INTO order_items (order_id, menu_product_id, quantity, price, total_price) VALUES (?, ?, ?, ?, ?)',
                [orderId, item.menu_product_id, item.quantity, item.price, item.total_price]
            );
        }

        res.status(201).json({ message: 'Order created successfully', order_id: orderId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err.message });
    }
};

// Get all orders for a specific user
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const [orders] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user orders', error: err.message });
    }
};

// Get details of a specific order, including its items
exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Get the order details
        const [order] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);

        if (order.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Get the items in the order
        const [orderItems] = await db.execute(
            'SELECT oi.*, mp.name, mp.description, mp.photo_url FROM order_items oi INNER JOIN menu_products mp ON oi.menu_product_id = mp.id WHERE oi.order_id = ?',
            [orderId]
        );

        res.json({ order: order[0], items: orderItems });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching order details', error: err.message });
    }
};

// Update the status of an order (e.g., Confirmed, Completed)
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Please provide a valid status.' });
        }

        await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
        res.json({ message: 'Order status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating order status', error: err.message });
    }
};

// Delete an order and its associated items
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Delete items associated with the order first
        await db.execute('DELETE FROM order_items WHERE order_id = ?', [orderId]);

        // Delete the order itself
        await db.execute('DELETE FROM orders WHERE id = ?', [orderId]);

        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting order', error: err.message });
    }
};
