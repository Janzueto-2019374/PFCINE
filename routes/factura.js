const { Router } = require('express');
const { getFacturas, cancelarBoleto } = require('../controllers/factura');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

// Obtener facturas del usuario
router.get('/', validarJWT, getFacturas);

// Cancelar boleto
router.delete('/cancelar/:id', validarJWT, cancelarBoleto);

module.exports = router;
