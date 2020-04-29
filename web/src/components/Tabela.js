import React, { useEffect, useState } from 'react'

import dataServer from '../function/dataServer'

export default function Tabela(props) {
  const [valorModf, setValorModf] = useState([])

  const { livros, removerLivroPagina, adicionarLivroModf } = props

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

  function TableBody(props) {
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
      await dataServer('delete', {}, valorModf[0])
    }

    if (valorModf[2] === 'remover') {
      removerLivroServer()
      removerLivroPagina(valorModf[1])
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
