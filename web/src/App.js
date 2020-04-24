//Importações Modulos
import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

//Importando CSS/Materialize
import 'materialize-css/dist/css/materialize.min.css'

//Importando Componentes
import Header from './components/Header'
import Tabela from './components/Tabela'
import Form from './components/Form'

//Funcão Principal
export default function App() {
  const [livros, setLivros] = useState([])

  function removerLivroPagina(index) {
    setLivros(
      livros.filter((livro, posAtual) => {
        return posAtual !== index
      }),
    )
  }

  function adicionarLivro(objLivro) {
    const insert = livros.slice()
    insert.push(objLivro)
    setLivros(insert)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const livrosData = await axios.get('http://localhost:3001/api/livros')
        setLivros(livrosData.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      {livros ? (
        <Fragment>
          <Header />
          <div className="container">
            <Tabela livros={livros} removerLivroPagina={removerLivroPagina} />
            <Form adicionarLivro={adicionarLivro} />
          </div>
        </Fragment>
      ) : (
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
