//Importando Modulos
import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Função Principal
export default function Tabela(props) {
  //States
  //Livro que quer modificar
  const [valorModf, setValorModf] = useState([])

  //Props vindo do App
  const { livros, removerLivroPagina, adicionarLivroModf } = props

  //Tabela HEAD
  function TableHead() {
    return (
      <thead>
        <tr>
          <th>Livro</th>
          <th>Autor</th>
          <th>Lançamento</th>
          <th>Preço</th>
          <th>Remover</th>
          <th>Modificar</th>
        </tr>
      </thead>
    )
  }

  //Tabela BODY
  function TableBody(props) {
    //Cria o HTML referente aquele livro
    function criarLivro(nome, autor, anoLancamento, preco, index) {
      return (
        <tr key={index}>
          <td>{nome}</td>
          <td>{autor}</td>
          <td>{anoLancamento}</td>
          <td>{preco}</td>
          <td>
            <button
              className="waves-effect waves-light btn-small"
              onClick={() => setValorModf([nome, index, 'remover'])}
            >
              Remover
            </button>
          </td>
          <td>
            <button
              className="waves-effect waves-light btn-small"
              onClick={() => setValorModf([nome, index, 'modificar'])}
            >
              Modificar
            </button>
          </td>
        </tr>
      )
    }

    //Utiliza a função criaLivro() para criar o HTML
    const linhas = props.livros.map((valor, index) => {
      return criarLivro(
        valor.nome,
        valor.autor,
        valor.anoLancamento,
        valor.preco,
        index,
      )
    })

    return <tbody>{linhas}</tbody>
  }

  useEffect(() => {
    async function removerLivroServer() {
      try {
        await axios.delete(`http://localhost:3001/api/livros/${valorModf[0]}`)
        removerLivroPagina(valorModf[1])
      } catch (error) {
        console.log(error)
      }
    }

    if (valorModf[2] === 'remover') {
      removerLivroServer()
    } else if (valorModf[2] === 'modificar') {
      adicionarLivroModf(valorModf[1])
    }
  }, [valorModf])

  return (
    <table className="centered highlight responsive-table">
      <TableHead />
      <TableBody livros={livros} />
    </table>
  )
}
