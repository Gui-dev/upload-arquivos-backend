import mongoose from 'mongoose'
import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3()

const Post = new mongoose.Schema( {

  name: { 
    type: String,
    required: true 
  },
  size: {
    type: Number,
    required: true 
  },
  key: { 
    type: String,
    required: true 
  },
  url: {
    type: String,
    // required: true
  }
}, {
  timestamps: true
} )

Post.pre( 'save', function() {

  if( !this.url ) {
    const url = process.env.URL
    this.url =`${url}/files/${encodeURIComponent(this.key)}`
  }
} )

Post.pre( 'remove', function() {

  if( process.env.STORAGE_TYPE === 's3' ) {

    return s3.deleteObject( {
      Bucket: 'upload-files',
      key: this.key
    } ).promise()
  } else {
    return promisify( fs.unlink )( path.resolve( 
      __dirname, '..', '..', 'tmp', 'uploads', this.key
     ) )
  }

} )

export default mongoose.model( 'Post', Post )