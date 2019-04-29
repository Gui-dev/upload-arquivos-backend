import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import routes from './routes'

/**
 * Iniciando o express e definindo a porta do servidor
 */
const app = express()
const port = process.env.PORT || 3333

/**
 * Database setup
 */

mongoose.connect('mongodb+srv://gui:gui@cluster0-inoc3.mongodb.net/upload?retryWrites=true', {
  useNewUrlParser: true
})

/**
 * Configuração dos Middlewares
 */
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( morgan( 'combined' ) )

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