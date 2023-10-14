const { response, request } = require('express');
const Pelicula = require('../models/pelicula');

const getPeliculas = async (req = request, res = response) => {
  try {
    const peliculas = await Pelicula.find();
    res.json({
      msg: 'GET API de pelicula',
      peliculas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al obtener las películas',
    });
  }
};

const postPelicula = async (req = request, res = response) => {
  try {
    const { titulo, imagenPoster, clasificacion } = req.body;
    const pelicula = new Pelicula({ titulo, imagenPoster, clasificacion });
    await pelicula.save();
    res.json({
      msg: 'POST API de pelicula',
      pelicula,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al crear la película',
    });
  }
};

const putPelicula = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { titulo, imagenPoster, clasificacion } = req.body;

    const pelicula = await Pelicula.findByIdAndUpdate(id, { titulo, imagenPoster, clasificacion }, { new: true });

    if (!pelicula) {
      return res.status(404).json({
        msg: 'Pelicula no encontrada',
      });
    }

    res.json({
      msg: 'PUT API de pelicula',
      pelicula,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al actualizar la película',
    });
  }
};

const deletePelicula = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findByIdAndDelete(id);

    if (!pelicula) {
      return res.status(404).json({
        msg: 'Pelicula no encontrada',
      });
    }

    res.json({
      msg: 'DELETE API de pelicula',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al eliminar la película',
    });
  }
};

module.exports = {
  getPeliculas,
  postPelicula,
  putPelicula,
  deletePelicula,
};
