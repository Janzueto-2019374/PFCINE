const { Router } = require('express');
const {
  getBoletos,
  postBoleto,
  putBoleto,
  deleteBoleto,
} = require('../controllers/boleto');

const router = Router();

router.get('/', getBoletos);
router.post('/agregar', postBoleto);
router.put('/editar/:id', putBoleto);
router.delete('/eliminar/:id', deleteBoleto);

module.exports = router;