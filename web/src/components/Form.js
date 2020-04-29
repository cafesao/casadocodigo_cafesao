import React, { useState, useEffect } from 'react'

import dataServer from '../function/dataServer'

export default function Form(props) {
  const [nome, setNome] = useState('')
  const [autor, setAutor] = useState('')
  const [anoLancamento, setAnoLancamento] = useState()
  const [preco, setPreco] = useState()
  const [acao, setAcao] = useState('post')

  const { adicionarLivroPagina, modificarLivroPagina, buscarLivroModf } = props

  let livroModf = buscarLivroModf()

  useEffect(() => {
    function modificaCamposInput(obj) {
      document.querySelector('input#nome').value = obj.nome
      document.querySelector('input#autor').value = obj.autor
      document.querySelector('input#anoLancamento').value = obj.anoLancamento
      document.querySelector('input#preco').value = obj.preco
    }

    function modificaStatesInput(obj) {
      setNome(obj.nome)
      setAutor(obj.autor)
      setAnoLancamento(obj.anoLancamento)
      setPreco(obj.preco)
    }

    if (livroModf.length > 0) {
      modificaStatesInput(livroModf[0])
      modificaCamposInput(livroModf[0])

      setAcao('put')
    }
  }, [livroModf])

  async function inserirLivroServer(e) {
    function prepararObjeto() {
      const objLivro = {
        nome,
        autor,
        anoLancamento: parseInt(anoLancamento),
        preco: parseFloat(preco),
      }
      return objLivro
    }

    function limparCampos() {
      document.querySelector('input#nome').value = ''
      document.querySelector('input#autor').value = ''
      document.querySelector('input#anoLancamento').value = ''
      document.querySelector('input#preco').value = ''
    }

    async function addPut() {
      const data = await dataServer('put', objLivro, objLivro.nome)
      if (data === 'error') console.log('error')
      else {
        limparCampos()

        modificarLivroPagina(objLivro)

        setAcao('post')
      }
    }

    async function addPost() {
      const data = await dataServer('post', objLivro)
      if (data === 'error') console.log('error')
      else {
        limparCampos()

        adicionarLivroPagina(objLivro)
      }
    }
    e.preventDefault()

    const objLivro = prepararObjeto()

    if (acao === 'put') addPut()
    else addPost()
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
