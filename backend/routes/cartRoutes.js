const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/', verifyToken, cartController.getCart);
router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:productId', verifyToken, cartController.removeFromCart);

module.exports = router;
