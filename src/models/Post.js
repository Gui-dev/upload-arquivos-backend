import mongoose from 'mongoose'

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


export default mongoose.model( 'Post', Post )