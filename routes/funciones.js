const { Router } = require('express');
const {
  getFunciones,
  postFuncion,
  putFuncion,
  deleteFuncion,
} = require('../controllers/funcion');

const router = Router();

router.get('/', getFunciones);
router.post('/agregar', postFuncion);
router.put('/editar/:id', putFuncion);
router.delete('/eliminar/:id', deleteFuncion);

module.exports = router;