const jwt = require('jsonwebtoken');

// Verifica si hay token y lo valida
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    // Debe venir en formato "Bearer token"
    if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Validar token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }

      req.user = decoded; // Contiene { id, role }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar token', error: error.message });
  }
};

// Middleware para verificar rol de administrador
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
  }
  next();
};
