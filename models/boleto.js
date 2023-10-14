const { Schema, model } = require('mongoose');

const boletoSchema = new Schema({
  idPelicula: {
    type: Schema.Types.ObjectId,
    ref: 'Pelicula',
    required: true,
  },
  asientos: [
    {
      type: String,
      required: true,
    },
  ],
  idFuncion: {
    type: Schema.Types.ObjectId,
    ref: 'Funcion',
    required: true,
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

boletoSchema.pre('save', async function (next) {
  const Boletos = model('Boleto', boletoSchema);
  const asientosOcupados = await Boletos.find({ idPelicula: this.idPelicula, idFuncion: this.idFuncion });
  
  const asientosOcupadosArray = [].concat(...asientosOcupados.map(boleto => boleto.asientos));
  
  for (const asiento of this.asientos) {
    if (asientosOcupadosArray.includes(asiento)) {
      return next(new Error(`El asiento ${asiento} ya está ocupado.`));
    }
  }

  next();
});

module.exports = model('Boleto', boletoSchema);