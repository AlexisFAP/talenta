const PostgresService = require('../services/potgres.service');
const _pg = new PostgresService()

const crearUsuario = async (user) => {
    const sql = 'INSERT INTO public.usuarios (cedula, nombre, correo,clave, telefono) VALUES($1, $2, $3,md5($4), $5);'
    const datos = [user.cedula, user.nombre, user.correo, user.clave, user.telefono]
    return await _pg.ejecutarQuery(sql, datos)
}

const consultarUsuarios = async (id) => {
    let sql = 'SELECT cedula, nombre, correo, telefono FROM usuarios'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarUsuario = async (user) => {
    const sql = 'DELETE FROM public.usuarios WHERE cedula=$1';
    const datos = [user.cedula]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarUsuario = async (usuario) => {
    const sql = `UPDATE public.usuarios SET nombre=$1, correo=$2, telefono=$3  WHERE cedula=$4;`
    const datos = [usuario.nombre, usuario.correo, usuario.telefono, usuario.cedula]
    return await _pg.ejecutarQuery(sql, datos)
}

const login = async (credenciales) => {
    let sql = 'SELECT cedula, nombre, telefono, correo FROM usuarios WHERE correo=$1 and clave=md5($2)'
    const datos = [credenciales.correo, credenciales.clave]
    let respuesta_db = await _pg.ejecutarQuery(sql, datos)
    let usuario = respuesta_db.rowCount == 1 ? respuesta_db.rows[0] : null
    if (usuario) {
        return {cedula:usuario.cedula, nombre: usuario.nombre}
    } else {
        return undefined
    }
}

module.exports = {crearUsuario, consultarUsuarios, eliminarUsuario, modificarUsuario, login }