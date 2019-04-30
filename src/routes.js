import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import PostController from './controllers/PostController'

const routes = express.Router()

routes.get( '/posts', PostController.show )

routes.post( 
  '/posts', 
  multer( multerConfig ).single( 'file' ), 
  PostController.store
)

routes.delete( '/posts/:id', PostController.destroy )

export default routes