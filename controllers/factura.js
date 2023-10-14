const { response, request } = require('express');
const Factura = require('../models/factura');

const getFacturas = async (req = request, res = response) => {
  try {
    const idUsuario = req.idUsuario; // Obtén el ID del usuario desde el token u otra fuente
    const facturas = await Factura.find({ idUsuario }).populate('idBoleto').populate('funcion.idFuncion').populate('pelicula.idPelicula');
    res.json({
      msg: 'GET API de factura',
      facturas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al obtener las facturas',
    });
  }
};

const cancelarBoleto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findById(id);

    if (!factura) {
      return res.status(404).json({
        msg: 'Factura no encontrada',
      });
    }

    const currentDate = new Date();
    if (factura.funcion.fechaHora <= currentDate) {
      return res.status(400).json({
        msg: 'No se puede cancelar un boleto después de la fecha y hora de la función.',
      });
    }

    await factura.remove();

    res.json({
      msg: 'Boleto cancelado exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hubo un error al cancelar el boleto',
    });
  }
};

module.exports = {
  getFacturas,
  cancelarBoleto,
};
