const db = require('../config/db');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (category.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category' });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        await db.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.status(201).json({ message: 'Category created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', err });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        await db.execute('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating category' });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        await db.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category' });
    }
};
