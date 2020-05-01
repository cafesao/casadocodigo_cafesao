import React, { useState, useEffect, useCallback, useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Toast from '../components/Toast'
import Header from '../components/Header'
import Pesquisar from '../components/Pesquisar'
import Tabela from '../components/Tabela'
import Form from '../components/Form'

import dataServer from '../function/dataServer'

const useStyle = makeStyles({
  pagina: {
    width: '1920px',
    height: '700px',
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export default function Main() {
  const style = useStyle()

  const [livros, setLivros] = useState([])
  const [livroModf, setLivroModf] = useState([])
  const [recarregar, setRecarregar] = useState(false)
  const [mensagem, setMensagem] = useState({
    open: false,
    texto: '',
    tipo: 'success',
  })
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
    setMensagem({
      open: true,
      texto: 'Foi adicionando seu livro com sucesso!',
      tipo: 'success',
    })
  }

  function modificarLivroPagina(objLivro) {
    const mapeado = livros.map((valor, index) => {
      if (valor._id === objLivro._id) {
        valor = objLivro
        return valor
      }
      return valor
    })
    setMensagem({
      open: true,
      texto: 'Seu livro foi modificado!',
      tipo: 'success',
    })
    setLivros(mapeado)
  }

  const removerLivroPagina = useCallback((id) => {
    setLivros((livros) =>
      livros.filter((livro, posAtual) => {
        return livro._id !== id
      }),
    )
    setMensagem({
      open: true,
      texto: 'Seu livro foi removido!',
      tipo: 'success',
    })
  }, [])

  const pesquisarLivroServer = useCallback((nome) => {
    async function fetchData() {
      const axiosData = await dataServer('get', {}, nome)
      if (axiosData === 'erro') {
        setMensagem({
          open: true,
          texto: 'Tivemos um problema ao encontrar seu livro',
          tipo: 'error',
        })
      } else {
        setLivros(axiosData)
        setMensagem({
          open: true,
          texto: 'Seu livro foi encontrado!',
          tipo: 'success',
        })
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
        setMensagem({
          open: true,
          texto: 'Não foi possivel se conectar ao server!',
          tipo: 'error',
        })
      } else {
        setLivros(axiosData)
      }
    }
    fetchData()
    setMensagem({
      open: true,
      texto: 'Bem vindo a casa do código',
      tipo: 'info',
    })
  }, [recarregar])

  return (
    <div>
      <>
        <Toast
          open={mensagem.open}
          handleClose={() => setMensagem({ ...mensagem, open: false })}
          severity={mensagem.tipo}
        >
          {mensagem.texto}
        </Toast>
        <Header />
        <div className={style.pagina}>
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
