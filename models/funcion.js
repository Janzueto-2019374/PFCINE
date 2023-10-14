const { Schema, model } = require('mongoose');

const funcionSchema = new Schema({
  idFuncion: {
    type: String,
    required: true,
  },
  fechaHora: {
    type: Date,
    required: true,
  },
});

module.exports = model('Funcion', funcionSchema);
