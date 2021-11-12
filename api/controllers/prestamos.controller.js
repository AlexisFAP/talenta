const PostgresService = require('../services/potgres.service');
const _pg = new PostgresService()

const crearPrestamo = async (prestamo) => {
    const sql = 'INSERT INTO public.prestamos (usuario, libro, fecha_prestamo, fecha_entrega_establecida) VALUES($1, $2, $3,$4);'
    const datos = [prestamo.usuario, prestamo.libro, prestamo.fecha_prestamo, prestamo.fecha_entrega_establecida]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarPrestamos = async (id) => {
    let sql = 'SELECT * FROM prestamos'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const modificarPrestamo = async (prestamo) => {
    const sql = `UPDATE public.prestamos SET fecha_entrega=$1 WHERE id=$2;`
    const datos = [prestamo.fecha_entrega, prestamo.id]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = {crearPrestamo, consultarPrestamos, modificarPrestamo }