import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Tabela(props) {
  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>Livro</th>
          <th>Autor</th>
          <th>Lançamento</th>
          <th>Preço</th>
          <th>Remover</th>
        </tr>
      </thead>
    )
  }

  const TableBody = (props) => {
    const linhas = props.livros.map((valor, index) => {
      return (
        <tr key={index}>
          <td>{valor.nome}</td>
          <td>{valor.autor}</td>
          <td>{valor.dataLancamento}</td>
          <td>{valor.preco}</td>
          <td>
            <button onClick={() => setValorModf([valor.nome, index])}>
              Remover
            </button>
          </td>
        </tr>
      )
    })

    return <tbody>{linhas}</tbody>
  }

  const [valorModf, setValorModf] = useState()

  useEffect(() => {
    async function removerLivro() {
      await axios.delete(`http://localhost:3001/api/livros/${valorModf[0]}`)
      removerLivroPagina(valorModf[1])
    }

    if (valorModf) {
      removerLivro()
    }
  }, [valorModf])

  const { livros, removerLivroPagina } = props

  return (
    <table>
      <TableHead />
      <TableBody livros={livros} />
    </table>
  )
}
