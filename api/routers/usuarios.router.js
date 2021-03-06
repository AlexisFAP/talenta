const express = require('express');
const router = express.Router()

const controller = require('../controllers/usuarios.controller')

router.post('/usuarios', async (req, res) => {
    let usuario = req.body
    try {
        let respuesta_db = await controller.crearUsuario(usuario)
        let info = respuesta_db.rowCount == 1 ? `Usuario creado: ${usuario.cedula}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario creado correctamente' : 'No se creo el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

router.put('/usuarios', async (req, res) => {
    let usuario = req.body
    try {
        let respuesta_db = await controller.modificarUsuario(usuario)
        let info = respuesta_db.rowCount == 1 ? `Usuario modificado: ${usuario.cedula}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario modificado correctamente' : 'No se modifico el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.get('/usuarios', async (req, res) => {
    let id = req.params.id
    controller.consultarUsuarios(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Usuarios consultado', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })
})

router.delete('/usuarios', async (req, res) => {
    try {
        let usuario = req.body
        let respuesta_db = await controller.eliminarUsuario(usuario)
        let info = respuesta_db.rowCount == 1 ? `Usuario eliminado: ${usuario.cedula}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Usuario eliminado correctamente' : 'No se elimino al Usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

router.post('/login', async (req, res) => {
    let credenciales = req.body
    try {
        let usuario = await controller.login(credenciales)
        let info = usuario
        let message = usuario ? 'Usuario consultado' : 'No se encontro el usuario.'
        return res.send({ ok: usuario !== undefined, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

module.exports = router