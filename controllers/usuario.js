//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = (req = request, res = response) => {

    res.json({
        msg: 'GET API de usuarios'
    });

}

const postUsuario = async(req = request, res = response) => {

    const { nombre, correo, password, rol }  = req.body;
    const usuarioDB = new Usuario({nombre, correo, password, rol});

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync( password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const putUsuario = (req = request, res = response) => {

    const { id } =  req.params;

    const user = req.body;

    res.json({
        msg: 'PUT API de usuario',
        id,
        user
    });

}



const deleteUsuario = (req = request, res = response) => {

    const { id } =  req.params;

    res.json({
        msg: 'DELETE API de usuario',
        id
    });

}



module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}