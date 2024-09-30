const express = require('express');
const menuProductController = require('../controllers/menuProductController');
const router = express.Router();

router.get('/', menuProductController.getAllMenuProducts);
router.get('/:id', menuProductController.getMenuProductById);
router.get('/category/:categoryId', menuProductController.getMenuProductsByCategoryId);
router.post('/', menuProductController.createMenuProduct);
router.put('/:id', menuProductController.updateMenuProduct);
router.delete('/:id', menuProductController.deleteMenuProduct);

module.exports = router;
