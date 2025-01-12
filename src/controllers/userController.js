const {obtenerUsuario,crearUsuario,autenticarUsuario} = require('../modules/usuarios')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken');
require('dotenv').config();



exports.obtenerUsuarios = async(req,res) => {
  try {
    const usuario = await obtenerUsuario(req);
    res.status(200).send(usuario)
  } catch (error) {
    res.status(500).send('No se pudo obtener datos')
  }
}

exports.crearUsuarios = async(req,res)=>{
  try {
    let { email, password, rol, lenguage} = req.body
    password = await bcrypt.hash(password,12)
    await crearUsuario(email,password,rol,lenguage);
    res.status(201).send('Usuario creado con exito')
  } catch (error) {
    throw new Error("No se pudo crear el usuario");
    
  }
}

exports.autenticarUsuarios = async(req,res) =>{
  try {
    const {email,password} = req.body;
    const usuario = await autenticarUsuario(email)

    if(!usuario){
      res.status(401).json({message:"Usuario no existe"})
    }else{
      if(!bcrypt.compareSync(password,usuario.password)){
        res.status(401).json({message:"Contrasena invalida"})
      } else{
        const token = jwt.sign(
          {
            email:usuario.email,
            id:usuario.id,
            rol:usuario.rol,
            lenguage:usuario.lenguage
          },
          process.env.TOKEN_PWD
        )
        res.status(200).json({'token':token})
      }
    }
  } catch (error) {
    res.status(500).send("Fallo la autentificacion")
    
  }
}