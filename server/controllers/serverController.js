//Importando Modelo
const Livro = require('../model/livroModel')

//Exportando Controller
module.exports = {
  //Criando Metodos
  async livrosTodos(req, res) {
    const livros = await Livro.find()
    if (livros.length > 0) {
      return res.json(livros)
    }
    return res.status(404).json({ resposta: 'Não contém nenhum livro!' })
  },

  async livroSeleto(req, res) {
    const nome = req.params.nome
    const livro = await Livro.find({ nome })
    if (livro.length > 0) {
      return res.json(livro)
    }
    return res.status(404).json({ resposta: 'Livro não encontrado' })
  },

  async adicionarLivro(req, res) {
    let nome = req.body.nome
    if (nome === undefined) {
      async function verifica(nomes) {
        let existe = false

        for (let i = 0; i < nomes.length; i++) {
          if (existe) {
            break
          } else {
            let livro = await Livro.find({ nome: nomes[i] })
            if (livro.length > 0) {
              existe = true
            }
          }
        }

        if (existe) {
          return res.status(409).json({
            resposta: 'Um dos livros ja foi adicionando anteriormente!',
          })
        }
        await Livro.create(req.body)
        return res.json({ resposta: 'Seu livro foi adicionado' })
      }
      const nomes = req.body.map((valor) => valor.nome)

      return verifica(nomes)
    } else {
      const verificarLivro = await Livro.find({ nome })
      if (verificarLivro.length > 0) {
        return res
          .status(409)
          .json({ resposta: 'O livro ja foi adicionando anteriormente!' })
      }
      await Livro.create(req.body)
      return res.json({ resposta: 'Seu livro foi adicionado' })
    }
  },

  async modificarLivro(req, res) {
    const nome = req.params.nome
    const livroModif = req.body

    const update = await Livro.updateOne({ nome }, livroModif, {
      new: true,
    })
    if (update.nModified === 1) {
      return res.json({ resposta: 'Seu livro foi modificado com sucesso!' })
    }
    return res
      .status(404)
      .json({ resposta: 'Não foi possivel encontrar o livro' })
  },

  async deletarLivro(req, res) {
    const nome = req.params.nome
    const deletarLivro = await Livro.deleteOne({ nome })
    if (deletarLivro.n === 1) {
      return res.json({ resposta: 'Seu livro foi deletado com sucesso!' })
    }
    return res.status(404).json({ resposta: 'Seu livro não foi encontrado' })
  },
}
