import React, { useEffect, useState } from 'react'

import Toast from './Toast'

import Tabela from '../components/Tabela'

import dataServer from '../function/dataServer'

export default function Lista(props) {
  const [lista, setLista] = useState([])
  const [mensagem, setMensagem] = useState({
    open: false,
    texto: '',
    tipo: 'success',
  })

  const { prop } = props

  const campos = [
    {
      titulo: '',
      prop: '',
    },
  ]

  if (prop === 'Livros') {
    campos[0].titulo = prop
    campos[0].prop = 'nome'
  } else if (prop === 'Autores') {
    campos[0].titulo = prop
    campos[0].prop = 'autor'
  }

  useEffect(() => {
    async function fetchData() {
      const axiosData = await dataServer('get')

      if (axiosData === 'erro') {
        setMensagem({
          open: true,
          texto: 'Tivemos um problema ao se conectar com o server',
          tipo: 'error',
        })
      } else {
        setLista(axiosData)
      }
    }

    fetchData()
  }, [prop])

  return (
    <div className="lista">
      <Toast
        open={mensagem.open}
        handleClose={() => setMensagem({ open: false })}
        severity={mensagem.tipo}
      >
        {mensagem.texto}
      </Toast>
      <Tabela campos={campos} dados={lista} />
    </div>
  )
}
