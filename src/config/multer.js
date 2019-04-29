import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const storageTypes = {

  local: multer.diskStorage( {
    
    destination: ( req, file, cb ) => {
      cb( null, path.resolve( __dirname, '..', '..', 'tmp', 'uploads' ) )
    },

    filename: ( req, file, cb ) => {
      crypto.randomBytes( 16, ( err, hash ) => {

        if( err ) cb( err )

        const fileName = `${hash.toString( 'hex' )}-${file.originalname}`
        cb( null, fileName )
      } )
    }

  } ),

  s3: multerS3( {

    s3: new aws.S3(),
    bucket: 'upload-files'
  } )
  
}

export default {

  dest: path.resolve( __dirname, '..', '..', 'tmp', 'uploads' ),
  
  storage: storageTypes.local,
  
  limits: {
    fileSize: 2 * 1024 * 1024
  },

  fileFilter: ( req, file, cb ) => {
    const allowedMimes = [ 
      'image/jpg',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/svg'
    ]

    if( allowedMimes.includes( file.mimetype ) ) {
      cb( null, true )
    } else {
      cb( new Error( 'Invalid file type' ) )
    }
  }
  
}