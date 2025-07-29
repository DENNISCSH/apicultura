const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/User');
const cartRoutes = require('./routes/cartRoutes');
const mercadopago = require('mercadopago'); // <--- AÑADIDO
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', require('./routes/paymentRoutes'));


mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});



// === RUTAS DEL BACKEND ===
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);

// === NUEVA RUTA: CREAR PREFERENCIA DE PAGO ===
app.post('/create_preference', async (req, res) => {
  try {
    const items = req.body.items.map(item => ({
      title: item.product.name,
      unit_price: item.product.price,
      quantity: item.quantity,
      currency_id: "PEN"
    }));

    const preference = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending"
      },
      auto_return: "approved"
    });

    res.json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: "Error al crear preferencia" });
  }
});

// === RUTA TEST ===
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// === INICIAR SERVIDOR ===
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(async () => {
  console.log('DB sincronizada');

  // Crear usuario admin si no existe
  const admin = await User.findOne({ where: { email: 'admin@demo.com' } });
  if (!admin) {
    await User.create({
      name: 'Admin',
      email: 'admin@demo.com',
      password: '123456', // luego encriptaremos
      role: 'admin'
    });
    console.log('Usuario admin creado: admin@demo.com / 123456');
  }

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}).catch(err => console.error('Error al sincronizar DB', err));
