const { Router } = require('express');
const {
  getPeliculas,
  postPelicula,
  putPelicula,
  deletePelicula,
} = require('../controllers/pelicula');

const router = Router();

router.get('/', getPeliculas);
router.post('/agregar', postPelicula);
router.put('/editar/:id', putPelicula);
router.delete('/eliminar/:id', deletePelicula);

module.exports = router;