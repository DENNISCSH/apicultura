const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/User');
const cartRoutes = require('./routes/cartRoutes');
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', cartRoutes);

app.use("/api/payments", paymentRoutes);



app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

const PORT = process.env.PORT || 5000;

// Sincronizar DB
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
