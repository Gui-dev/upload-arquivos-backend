import Post from './../models/Post'

class PostController {

  async store( req, res ) {

    try {
      const { originalname: name, size, filename: key, url } = req.file
      const post = await Post.create( { name, size, key, url: '' } )

      return res.status( 200 ).json( post )
    } catch (error) {
      
      return res.status( 400 ).json( {
        error: "Erro ao fazer upload do arquivo"
      } )
    }


  }
}

export default new PostController()