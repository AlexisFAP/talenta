const express = require('express');
const router = express.Router()

const controller = require('../controllers/libros.controller')

router.post('/libros', async (req, res) => {
    let libro = req.body
    try {
        let respuesta_db = await controller.crearLibro(libro)
        let info = respuesta_db.rowCount == 1 ? `Libro creado: ${libro.cedula}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Libro creado correctamente' : 'No se creo el libro.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

router.put('/libros', async (req, res) => {
    let libro = req.body
    try {
        let respuesta_db = await controller.modificarLibro(libro)
        let info = respuesta_db.rowCount == 1 ? `Libro modificado: ${libro.codigo}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Libro modificado correctamente' : 'No se modifico el libro.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

router.get('/libros', async (req, res) => {
    let id = req.params.id
    controller.consultarLibros(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Libros consultados', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })
})

router.delete('/libros', async (req, res) => {
    try {
        let libro = req.body
        let respuesta_db = await controller.eliminarLibro(libro)
        let info = respuesta_db.rowCount == 1 ? `Libro eliminado: ${libro.codigo}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Libro eliminado correctamente' : 'No se elimino el Libro.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

router.put('/libro-estado', async (req, res) => {
    let libro = req.body
    try {
        let respuesta_db = await controller.modificarEstado(libro)
        let info = respuesta_db.rowCount == 1 ? `Estado Libro modificado: ${libro.codigo}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Estado libro modificado correctamente' : 'No se modifico el estado del libro.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

module.exports = router