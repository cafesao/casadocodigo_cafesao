import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tabela from './components/Tabela'

import './App.css'

export default function App() {
  const [livros, setLivros] = useState()

  function removerLivroPagina(index) {
    setLivros(
      livros.filter((livro, posAtual) => {
        return posAtual !== index
      }),
    )
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
        <Tabela livros={livros} removerLivroPagina={removerLivroPagina} />
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  )
}
