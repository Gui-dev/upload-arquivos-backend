import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'

import routes from './routes'

/**
 * Iniciando o express e definindo a porta do servidor
 */
const app = express()
const port = process.env.PORT || 3333

/**
 * configurando o CORS
 */
app.use( cors() )

/**
 * Database setup
 */

mongoose.connect( process.env.MONGO_URL, {
  useNewUrlParser: true
})

/**
 * Configuração dos Middlewares
 */
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( morgan( 'combined' ) )
app.use( '/files', express.static( path.resolve( 
  __dirname, '..', 'tmp', 'uploads'
 ) ) )

/**
 * Configuração das Rotas
 */
app.use( routes )

/**
 * Iniciando Servidor
 */
app.listen( port, () => {

  console.log( `Servidor rodando na porta: ${port}` )
} )