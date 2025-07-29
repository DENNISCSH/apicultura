const express = require('express');
const { register, login } = require('../controllers/authController');
const User = require('../models/User'); // Importa el modelo
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Crear automáticamente admin si no existe
(async () => {
  try {
    const adminEmail = 'admin@admin.com';
    const adminPassword = '123456';

    // Verifica si ya existe el admin
    const adminExists = await User.findOne({ where: { email: adminEmail } });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Usuario admin creado automáticamente');
    }
  } catch (error) {
    console.error('Error creando admin automáticamente:', error);
  }
})();

module.exports = router;
