const { response, request } = require('express');
const Boleto = require('../models/boleto');

const getBoletos = async (req = request, res = response) => {
  try {
    const boletos = await Boleto.find();
    res.json({
      msg: 'GET API de boletos',
      boletos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al obtener los boletos',
    });
  }
};

const postBoleto = async (req = request, res = response) => {
  try {
    const { idPelicula, asientos, idFuncion, idUsuario } = req.body;
    const boleto = new Boleto({ idPelicula, asientos, idFuncion, idUsuario });
    await boleto.save();
    res.json({
      msg: 'POST API de boletos',
      boleto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al crear el boleto',
    });
  }
};

const putBoleto = async (req = request, res = response) => {
  const { id } = req.params;
  const { idPelicula, asientos, idFuncion, idUsuario } = req.body;
  try {
    const boleto = await Boleto.findByIdAndUpdate(id, { idPelicula, asientos, idFuncion, idUsuario }, { new: true });
    if (!boleto) {
      return res.status(404).json({
        msg: 'Boleto no encontrado',
      });
    }
    res.json({
      msg: 'PUT API de boletos',
      boleto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al actualizar el boleto',
    });
  }
};

const deleteBoleto = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const boleto = await Boleto.findByIdAndDelete(id);
    if (!boleto) {
      return res.status(404).json({
        msg: 'Boleto no encontrado',
      });
    }
    res.json({
        msg: 'DELETE API de boletos',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al eliminar el boleto',
    });
  }
};

module.exports = {
  getBoletos,
  postBoleto,
  putBoleto,
  deleteBoleto,
};
