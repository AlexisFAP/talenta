const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//***** IMPORT RUTAR *****//

const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)

const router_libro =  require('./routers/libros.router');
app.use(router_libro)

const router_prestamo =  require('./routers/prestamos.router');
app.use(router_prestamo)

app.use('/', (req, res)=>{
  let info={ok:false, message:'404 not found', info:null}
  res.status(404).send(info)
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listen on port:${port}`)
})