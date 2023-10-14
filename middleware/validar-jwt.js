// middleware/validar-jwt.js
const jwt = require('jsonwebtoken'); // Asegúrate de tener la librería 'jsonwebtoken' instalada

const validarJWT = (req, res, next) => {
  // 1. Obtener el token JWT del encabezado de la solicitud
  const token = req.header('x-auth-token'); // Asegúrate de usar el nombre correcto del encabezado

  // 2. Verificar si el token existe
  if (!token) {
    return res.status(401).json({ msg: 'No se proporcionó un token JWT. Acceso no autorizado.' });
  }

  // 3. Verificar y decodificar el token JWT
  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta'); // Reemplaza 'tu_clave_secreta' con tu clave secreta real

    // 4. Agregar el usuario decodificado al objeto de solicitud para su posterior uso
    req.usuario = decoded.usuario; // Puedes personalizar esto según tu estructura de token

    // 5. Continuar con la siguiente función middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token JWT inválido. Acceso no autorizado.' });
  }
};

module.exports = { validarJWT };