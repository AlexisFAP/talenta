const PostgresService = require('../services/potgres.service');
const _pg = new PostgresService()

const crearLibro = async (libro) => {
    const sql = 'INSERT INTO public.libros (codigo, nombre, estado,descripcion, genero, autor) VALUES($1, $2, $3,$4, $5,$6);'
    const datos = [libro.codigo, libro.nombre, libro.estado, libro.descripcion, libro.genero,libro.autor]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarLibros = async (id) => {
    let sql = 'SELECT * FROM libros'
    if (id) {
        sql += ` WHERE codigo = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarLibro = async (libro) => {
    const sql = 'DELETE FROM public.libros WHERE codigo=$1';
    const datos = [libro.codigo]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarLibro = async (libro) => {
    const sql = `UPDATE public.libros SET nombre=$1,  descripcion=$2, genero=$3,autor=$4  WHERE codigo=$5;`
    const datos = [libro.nombre, libro.descripcion, libro.genero,libro.autor,libro.codigo]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarEstado = async (libro) => {
    const sql = `UPDATE public.libros SET estado=$1 WHERE codigo=$2;`
    const datos = [libro.estado, libro.codigo]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = {crearLibro, consultarLibros, eliminarLibro, modificarLibro, modificarEstado }