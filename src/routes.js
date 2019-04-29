import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import PostController from './controllers/PostController'

const routes = express.Router()

routes.post( 
  '/posts', 
  multer( multerConfig ).single( 'file' ), 
  PostController.store
)

export default routes