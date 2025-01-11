const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/userController')
const auth = require('../middlewares/auth')


module.exports = () => {
  router.get('/', (req,res) =>{
    res.send('bienvenido')
  })

  router.get('/usuarios',auth,usuariosController.obtenerUsuarios)
  router.post('/usuarios',usuariosController.crearUsuarios)
  router.post('/login',usuariosController.autenticarUsuarios)

  return router
}