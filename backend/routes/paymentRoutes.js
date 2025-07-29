const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Configurar MercadoPago con el token del .env
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Ruta para crear preferencia de pago
router.post('/create_preference', async (req, res) => {
  try {
    // Log para depuración
    console.log("Datos recibidos del frontend:", req.body);

    // Transformar items que llegan del carrito
   const items = req.body.items.map(item => ({
  title: item.product.name,
  unit_price: Number(item.product.price), // Convertimos a número
  quantity: item.quantity,
  currency_id: "PEN"
}));


    console.log("Items para MercadoPago:", items);

    // Crear preferencia en MercadoPago
   const preference = await mercadopago.preferences.create({
  items,
  back_urls: {
    success: "https://apicultura-nnxr.onrender.com/success",
    failure: "https://apicultura-nnxr.onrender.com/failure",
    pending: "https://apicultura-nnxr.onrender.com/pending"
  }
});


    // Enviar al frontend el link de pago
    res.json({ init_point: preference.body.init_point });

  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
