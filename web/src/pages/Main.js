import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'

import 'materialize-css/dist/css/materialize.min.css'

import Header from '../components/Header'
import Tabela from '../components/Tabela'
import Form from '../components/Form'

import dataServer from '../function/dataServer'

export default function Main() {
  const alert = useAlert()

  const [livros, setLivros] = useState([])
  const [livroModf, setLivroModf] = useState([])

  function mostrarAlerta(mnsg, tipo = 'success') {
    alert[tipo](mnsg)
  }

  function adicionarLivroModf(index) {
    setLivroModf([livros[index], index])
  }

  function buscarLivroModf() {
    return livroModf
  }

  function adicionarLivroPagina(objLivro) {
    setLivros([...livros, objLivro])
    mostrarAlerta('Foi adicionado o livro com sucesso!')
  }

  function modificarLivroPagina(objLivro) {
    const insert = livros.slice()
    const index = livroModf[1]

    insert[index] = objLivro

    setLivros(insert)
    mostrarAlerta('Foi modificado o livro com sucesso!')
  }

  function removerLivroPagina(index) {
    setLivros((livros) =>
      livros.filter((livro, posAtual) => {
        return posAtual !== index
      }),
    )
    mostrarAlerta('Foi removido o livro com sucesso!')
  }

  useEffect(() => {
    async function fetchData() {
      const axiosData = await dataServer('get')
      if (axiosData === 'error') {
        mostrarAlerta(
          'Tivemos um problema ao se conectar com o server',
          'error',
        )
      } else {
        setLivros(axiosData)
        mostrarAlerta('Bem vindo a casa do código', 'info')
      }
    }
    fetchData()
  }, [])

  return (
    <div className="Main">
      {livros ? (
        <>
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
        </>
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
