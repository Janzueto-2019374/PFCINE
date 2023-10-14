const { Schema, model } = require('mongoose');

const facturaSchema = new Schema({
  idBoleto: {
    type: Schema.Types.ObjectId,
    ref: 'Boleto',
    required: true,
  },
  numeroAsiento: {
    type: String,
    required: true,
  },
  funcion: {
    idFuncion: {
      type: Schema.Types.ObjectId,
      ref: 'Funcion',
      required: true,
    },
    fechaHora: {
      type: Date,
      required: true,
    },
  },
  pelicula: {
    idPelicula: {
      type: Schema.Types.ObjectId,
      ref: 'Pelicula',
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    imagenPoster: {
      type: String,
    },
    clasificacion: {
      type: String,
    },
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

facturaSchema.pre('validate', function (next) {
  const currentDate = new Date();
  if (this.funcion.fechaHora <= currentDate) {
    return next(new Error('No se puede cancelar un boleto después de la fecha y hora de la función.'));
  }
  next();
});

module.exports = model('Factura', facturaSchema);