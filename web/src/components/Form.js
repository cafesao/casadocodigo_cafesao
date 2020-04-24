//Importando Modulos
import React, { useState } from 'react'
import axios from 'axios'

//Função Principal
export default function Form(props) {
  const [nome, setNome] = useState('')
  const [autor, setAutor] = useState('')
  const [dataLancamento, setDataLancamento] = useState()
  const [preco, setPreco] = useState()

  const { adicionarLivro } = props

  //Função inserLivro no banco de dados
  async function inserirLivro(e) {
    //Prepara o Objeto
    function prepararObjeto() {
      const objLivro = {
        nome,
        autor,
        dataLancamento: parseInt(dataLancamento),
        preco: parseFloat(preco),
      }
      return objLivro
    }

    //Limpa os campos
    function limparCampos() {
      document.querySelector('input#nome').value = ''
      document.querySelector('input#autor').value = ''
      document.querySelector('input#dataLancamento').value = ''
      document.querySelector('input#preco').value = ''
    }

    e.preventDefault()
    const objLivro = prepararObjeto()
    await axios.post('http://localhost:3001/api/livros', objLivro)
    limparCampos()
    adicionarLivro(objLivro)
  }

  return (
    <div className="row">
      <form onSubmit={inserirLivro} className="col s12">
        <div className="input-field col s6">
          <input
            id="nome"
            type="text"
            className="validate"
            name="nome"
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
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
          />
          <label className="input-field" htmlFor="autor">
            Autor
          </label>
        </div>
        <div className="input-field col s6">
          <label className="input-field" htmlFor="dataLancamento">
            Data de Lançamento
          </label>
          <input
            id="dataLancamento"
            type="number"
            name="dataLancamento"
            defaultValue={dataLancamento}
            onChange={(e) => setDataLancamento(e.target.value)}
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
          />
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Salvar<i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}
