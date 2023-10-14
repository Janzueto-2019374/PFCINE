const { response, request } = require('express');
const Funcion = require('../models/funcion');

const getFunciones = async (req = request, res = response) => {
  try {
    const funciones = await Funcion.find();
    res.json({
      msg: 'GET API de funcion',
      funciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al obtener las funciones',
    });
  }
};

const postFuncion = async (req = request, res = response) => {
  try {
    const { idFuncion, fechaHora } = req.body;
    const funcion = new Funcion({ idFuncion, fechaHora });
    await funcion.save();
    res.json({
      msg: 'POST API de funcion',
      funcion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al crear la función',
    });
  }
};

const putFuncion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { idFuncion, fechaHora } = req.body;

    const funcion = await Funcion.findByIdAndUpdate(id, { idFuncion, fechaHora }, { new: true });

    if (!funcion) {
      return res.status(404).json({
        msg: 'Función no encontrada',
      });
    }

    res.json({
      msg: 'PUT API de funcion',
      funcion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al actualizar la función',
    });
  }
};

const deleteFuncion = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const funcion = await Funcion.findByIdAndDelete(id);

    if (!funcion) {
      return res.status(404).json({
        msg: 'Función no encontrada',
      });
    }

    res.json({
        msg: 'DELETE API de funcion',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al eliminar la función',
    });
  }
};

module.exports = {
  getFunciones,
  postFuncion,
  putFuncion,
  deleteFuncion,
};
