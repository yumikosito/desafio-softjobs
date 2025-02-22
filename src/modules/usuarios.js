const { pool } = require('../config/db')
const jwt=require('jsonwebtoken');

exports.obtenerUsuario = async(req) => {
  try {
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    const {email} = jwt.decode(token)

    const SQLQuery = 'SELECT * FROM usuarios WHERE email=$1';
    const SQLValues = [email]
    const result = await pool.query(SQLQuery,SQLValues)
    return result.rows;

  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
}

exports.crearUsuario = async (email,password,rol,lenguage) => {
  try {
    const SQLQuery = 'INSERT INTO usuarios(email,password,rol,lenguage) VALUES ($1,$2,$3,$4)';
    const SQLValues = [email,password,rol,lenguage]
    const result = await pool.query(SQLQuery,SQLValues)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error al crear el usuario')
  }
}

exports.autenticarUsuario = async(email) =>{
  try {
    const SQLQuery = 'SELECT * FROM usuarios WHERE email=$1';
    const SQLValues = [email]
    const result = await pool.query(SQLQuery,SQLValues)
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener el usuario')
  }
}