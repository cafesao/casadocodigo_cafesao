//Importações Modulos
import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'

//Importando CSS/Materialize
import 'materialize-css/dist/css/materialize.min.css'

//Importando Componentes
import Header from './components/Header'
import Tabela from './components/Tabela'
import Form from './components/Form'

//Funcão Principal
export default function App() {
  //Para criar alertas
  const alert = useAlert()

  //States
  //Livros do Back-End
  const [livros, setLivros] = useState([])
  //Livro que quer modificar
  const [livroModf, setLivroModf] = useState([])

  function mostrarAlerta(msng, tipo = 'success') {
    alert[tipo](msng)
  }

  //Adiciona o livro que a gente quer modificar no state LivroModf
  function adicionarLivroModf(index) {
    setLivroModf([livros[index], index])
  }

  //Retorna o state LivroModf
  function buscarLivroModf() {
    return livroModf
  }

  //Adiciona Livro na Pagina
  function adicionarLivroPagina(objLivro) {
    const insert = livros.slice()
    insert.push(objLivro)
    setLivros(insert)
    mostrarAlerta('Foi adicionado o livro com sucesso!')
  }

  //Modifica o Livro na Pagina
  function modificarLivroPagina(objLivro) {
    const insert = livros.slice()
    const index = livroModf[1]

    //Replace do livro modificado no livro original
    insert[index] = objLivro
    setLivros(insert)
    mostrarAlerta('Foi modificado o livro com sucesso!')
  }

  //Remove o Livro na Pagina
  function removerLivroPagina(index) {
    setLivros(
      livros.filter((livro, posAtual) => {
        return posAtual !== index
      }),
    )
    mostrarAlerta('Foi removido o livro com sucesso!')
  }

  useEffect(() => {
    //Buscar os livros no Back-End
    async function fetchData() {
      try {
        const livrosData = await axios.get('http://localhost:3001/api/livros')
        setLivros(livrosData.data)
        mostrarAlerta('Bem-Vindo a casa do código!', 'info')
      } catch (err) {
        mostrarAlerta(
          'Tivemos um problema ao se conectar com o server',
          'error',
        )
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
            <Tabela
              livros={livros}
              removerLivroPagina={removerLivroPagina}
              adicionarLivroModf={adicionarLivroModf}
            />
            <Form
              adicionarLivroPagina={adicionarLivroPagina}
              modificarLivroPagina={modificarLivroPagina}
              buscarLivroModf={buscarLivroModf}
            />
          </div>
        </Fragment>
      ) : (
        //Circulo de carregamento
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
