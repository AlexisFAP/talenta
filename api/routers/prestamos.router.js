const express = require('express');
const router = express.Router()

const controller = require('../controllers/prestamos.controller')

router.post('/prestamos', async (req, res) => {
    let prestamo = req.body
    try {
        let respuesta_db = await controller.crearPrestamo(prestamo)
        let info = respuesta_db.rowCount == 1 ? `´Prestamo hecho: ${prestamo.id}` : ''
        let message = respuesta_db.rowCount == 1 ? '´Prestamo hecho correctamente' : 'No se hizo el prestamo.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

router.put('/prestamos', async (req, res) => {
    let prestamo = req.body
    try {
        let respuesta_db = await controller.modificarPrestamo(prestamo)
        let info = respuesta_db.rowCount == 1 ? `´Prestamo modificado: ${prestamo.id}` : ''
        let message = respuesta_db.rowCount == 1 ? '´Prestamo modificado correctamente' : 'No se modifico el prestamo.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

router.get('/prestamos', async (req, res) => {
    let id = req.params.id
    controller.consultarPrestamos(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Prestamos consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })
})

module.exports = router