import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useAlert } from 'react-alert'

import Header from '../components/Header'
import Pesquisar from '../components/Pesquisar'
import Tabela from '../components/Tabela'
import Form from '../components/Form'

import dataServer from '../function/dataServer'

export default function Main() {
  const alert = useAlert()

  const [livros, setLivros] = useState([])
  const [livroModf, setLivroModf] = useState([])
  const [recarregar, setRecarregar] = useState(false)

  const campos = useMemo(
    () => [
      {
        titulo: 'Livro',
        prop: 'nome',
      },
      {
        titulo: 'Autor',
        prop: 'autor',
      },
      {
        titulo: 'Lançamento',
        prop: 'anoLancamento',
      },
      {
        titulo: 'Preço R$',
        prop: 'preco',
      },
    ],
    [],
  )

  //Usar useCallback() resolveu o problema do render desnecessario na Table, toda vez que clicava no botão "modificar"...não sei pq resolveu
  const adicionarLivroModf = useCallback((id, dados) => {
    setLivroModf(() => {
      return dados.filter((livro, posAtual) => {
        return livro._id === id
      })
    })
  }, [])

  function buscarLivroModf() {
    return livroModf
  }

  function adicionarLivroPagina(objLivro) {
    setLivros([...livros, objLivro])
    alert.success('Foi adicionado o livro com sucesso!')
  }

  function modificarLivroPagina(objLivro) {
    const mapeado = livros.map((valor, index) => {
      if (valor._id === objLivro._id) {
        valor = objLivro
        return valor
      }
      return valor
    })

    setLivros(mapeado)
    alert.success('Foi modificado o livro com sucesso!')
  }

  const removerLivroPagina = useCallback((id) => {
    setLivros((livros) =>
      livros.filter((livro, posAtual) => {
        return livro._id !== id
      }),
    )
    alert.success('Foi removido o livro com sucesso!')
  }, [])

  const pesquisarLivroServer = useCallback((nome) => {
    async function fetchData() {
      const axiosData = await dataServer('get', {}, nome)
      if (axiosData === 'erro') {
        alert.error('Ops, não existe esse livro')
      } else {
        alert.success('Foi achado seu livro!')
        setLivros(axiosData)
      }
    }
    fetchData()
  }, [])

  const recarregarLivroServer = useCallback(() => {
    setRecarregar(!recarregar)
  }, [recarregar])

  useEffect(() => {
    async function fetchData() {
      const axiosData = await dataServer('get')
      if (axiosData === 'erro') {
        alert.error('Tivemos um problema ao se conectar com o server')
      } else {
        setLivros(axiosData)
        alert.info('Bem vindo a casa do código')
      }
    }
    fetchData()
  }, [recarregar])

  return (
    <div className="Main">
      <>
        <Header />
        <div className="container">
          <Pesquisar
            pesquisarLivroServer={pesquisarLivroServer}
            recarregarLivroServer={recarregarLivroServer}
          />
          <Tabela
            campos={campos}
            dados={livros}
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
    </div>
  )
}
