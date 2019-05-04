import Post from './../models/Post'

class PostController {

  async store( req, res ) {

    try {
      
      const { originalname: name, size, key, location: url = '' } = req.file
      const post = await Post.create( { name, size, key, url } )

      return res.status( 200 ).json( post )
    } catch (error) {
      
      console.log( error )
      return res.status( 400 ).json( {
        error: "Erro ao fazer upload do arquivo"
      } )
    }


  }

  async show( req, res ) {

    try {
      const posts = await Post.find()

      return res.status( 200 ).json( posts )
    } catch (error) {
      
      return res.status( 400 ).json( { 
        error: 'Erro ao buscar arquivos' 
      } )
    }
  }

  async destroy( req, res ) {

    try {
      
      const { id } = req.params
      const post = await Post.findById( id )
      await post.remove()

      return res.status( 200 ).json( { 
        success: "Arquivo deletado" 
      } )
    } catch (error) {

      return res.status( 400 ).json( { 
        error: 'Erro ao deletar arquivos' 
      } )
    }
  }
}

export default new PostController()