const db = require('../config/db');
const bucket = require('../config/firebase'); // Import the configured Firebase bucket
const { v4: uuidv4 } = require('uuid'); // Generate unique identifiers
const path = require('path');
const fs = require('fs');


// Get all menu products
exports.getAllMenuProducts = async (req, res) => {
    try {
        const [menuProducts] = await db.execute('SELECT * FROM menu_products');
        res.json(menuProducts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching menu products' });
    }
};

// Get a single menu product by ID
exports.getMenuProductById = async (req, res) => {
    try {
        const [menuProduct] = await db.execute('SELECT * FROM menu_products WHERE id = ?', [req.params.id]);
        if (menuProduct.length === 0) {
            return res.status(404).json({ message: 'Menu product not found' });
        }
        res.json(menuProduct[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching menu product' });
    }
};

// Create a new menu product 
exports.createMenuProduct = async (req, res) => {
    const { name, description, price, category_id, photo_url } = req.body; // Expect the photo_url to be in the request body

    try {
        // Check if the category_id exists in the categories table
        const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [category_id]);

        if (category.length === 0) {
            return res.status(400).json({ message: 'Invalid category ID. Please provide a valid category.' });
        }

        // Save the menu product to the database with the provided photo URL
        await db.execute(
            'INSERT INTO menu_products (name, description, price, photo_url, category_id) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, photo_url, category_id]
        );

        res.status(201).json({ message: 'Menu product created successfully', photo_url });
    } catch (err) {
        res.status(500).json({ message: 'Error creating menu product', error: err.message });
    }
};


// Update a menu product
exports.updateMenuProduct = async (req, res) => {
    const { name, description, price, category_id, photo_url } = req.body; // Expect the photo_url to be in the request body
    try {
        // Check if the category_id exists in the categories table
        const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [category_id]);

        if (category.length === 0) {
            return res.status(400).json({ message: 'Invalid category ID. Please provide a valid category.' });
        }

        // Update menu product in the database, include photo_url if it is provided
        const query = `UPDATE menu_products 
                       SET name = ?, description = ?, price = ?, ${photo_url ? 'photo_url = ?, ' : ''} category_id = ? 
                       WHERE id = ?`;
        const params = [name, description, price, ...(photo_url ? [photo_url] : []), category_id, req.params.id];

        await db.execute(query, params);

        res.json({ message: 'Menu product updated successfully', photo_url });
    } catch (err) {
        res.status(500).json({ message: 'Error updating menu product', error: err.message });
    }
};

// Delete a menu product
exports.deleteMenuProduct = async (req, res) => {
    try {
        await db.execute('DELETE FROM menu_products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Menu product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting menu product', error: err.message });
    }
};

// Get menu products by category ID
exports.getMenuProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const [menuProducts] = await db.execute('SELECT * FROM menu_products WHERE category_id = ?', [categoryId]);
        res.json(menuProducts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching menu products by category', error: err.message });
    }
};
