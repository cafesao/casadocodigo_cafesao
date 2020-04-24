//Importando Modulos
import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Função Principal
export default function Tabela(props) {
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
        </tr>
      </thead>
    )
  }

  //Tabela BODY
  function TableBody(props) {
    //Cria o HTML referente aquele livro
    function criarLivro(nome, autor, dataLancamento, preco, index) {
      return (
        <tr key={index}>
          <td>{nome}</td>
          <td>{autor}</td>
          <td>{dataLancamento}</td>
          <td>{preco}</td>
          <td>
            <button
              className="waves-effect waves-light btn-small"
              onClick={() => setValorModf([nome, index])}
            >
              Remover
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
        valor.dataLancamento,
        valor.preco,
        index,
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
    <table className="centered highlight responsive-table">
      <TableHead />
      <TableBody livros={livros} />
    </table>
  )
}
