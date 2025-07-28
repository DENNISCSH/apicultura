const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Obtener carrito por usuario
exports.getCart = async (req, res) => {
  try {
    const items = await Cart.findAll({
      where: { userId: req.user.id },
      include: [Product],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar producto al carrito
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let item = await Cart.findOne({
      where: { userId: req.user.id, productId },
    });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await Cart.create({
        userId: req.user.id,
        productId,
        quantity,
      });
    }

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto del carrito
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    await Cart.destroy({
      where: { userId: req.user.id, productId },
    });
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
