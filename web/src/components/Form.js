//Importando Modulos
import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Função Principal
export default function Form(props) {
  //States
  const [nome, setNome] = useState('')
  const [autor, setAutor] = useState('')
  const [anoLancamento, setAnoLancamento] = useState()
  const [preco, setPreco] = useState()
  //Boolean que controla PUT ou POST
  const [acao, setAcao] = useState('post')

  //Props vindo o APP
  const { adicionarLivroPagina, modificarLivroPagina, buscarLivroModf } = props

  //Executa function que retorna o livroModf
  let livroModf = buscarLivroModf()

  useEffect(() => {
    function modificaCamposInput(obj) {
      document.querySelector('input#nome').value = obj.nome
      document.querySelector('input#autor').value = obj.autor
      document.querySelector('input#anoLancamento').value = obj.anoLancamento
      document.querySelector('input#preco').value = obj.preco
    }

    if (livroModf.length > 0) {
      //Modifica os states conforme o livroModf
      setNome(livroModf[0].nome)
      setAutor(livroModf[0].autor)
      setAnoLancamento(livroModf[0].anoLancamento)
      setPreco(livroModf[0].preco)

      //Modifica ação (true = PUT)
      setAcao('put')

      //Chama a function para modificar os campos do Input
      modificaCamposInput(livroModf[0])
    }
  }, [livroModf])

  //Insere o livro no server
  async function inserirLivroServer(e) {
    //Prepara o Objeto conforme os states
    function prepararObjeto() {
      const objLivro = {
        nome,
        autor,
        anoLancamento: parseInt(anoLancamento),
        preco: parseFloat(preco),
      }
      return objLivro
    }

    //Limpa os campos de Input
    function limparCampos() {
      document.querySelector('input#nome').value = ''
      document.querySelector('input#autor').value = ''
      document.querySelector('input#anoLancamento').value = ''
      document.querySelector('input#preco').value = ''
    }

    //Previne default do Form
    e.preventDefault()

    //Chama a function para preparar objeto
    const objLivro = prepararObjeto()

    //Verifica que tipo de requisição e para ser feita para o server
    if (acao === 'put') {
      try {
        await axios.put(
          `http://localhost:3001/api/livros/${objLivro.nome}`,
          objLivro,
        )
        limparCampos()

        //Chama função para modificar o livro na pagina
        modificarLivroPagina(objLivro)

        //Modifica ação para 'post', para futuras alterações
        setAcao('post')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await axios.post('http://localhost:3001/api/livros', objLivro)
        limparCampos()

        //Chama a função para adicionar o novo livro na pagina
        adicionarLivroPagina(objLivro)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="row">
      <div className="alert"></div>
      <form onSubmit={inserirLivroServer} className="col s12">
        <div className="input-field col s6">
          <input
            id="nome"
            type="text"
            className="validate"
            name="nome"
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label className="input-field" htmlFor="nome">
            Nome
          </label>
        </div>
        <div className="input-field col s6">
          <input
            id="autor"
            type="text"
            name="autor"
            defaultValue={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
          <label className="input-field" htmlFor="autor">
            Autor
          </label>
        </div>
        <div className="input-field col s6">
          <label className="input-field" htmlFor="anoLancamento">
            Ano de Lançamento
          </label>
          <input
            id="anoLancamento"
            type="number"
            name="anoLancamento"
            defaultValue={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
            required
          />
        </div>
        <div className="input-field col s6">
          <label className="input-field" htmlFor="preco">
            Preço
          </label>
          <input
            id="preco"
            type="number"
            step="0.01"
            name="preco"
            defaultValue={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Salvar<i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}
