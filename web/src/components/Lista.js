import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'

import Tabela from '../components/Tabela'

import dataServer from '../function/dataServer'

export default function Lista(props) {
  const alert = useAlert()

  const [lista, setLista] = useState([])

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
        alert.error('Tivemos um problema ao se conectar com o server')
      } else {
        setLista(axiosData)
      }
    }

    fetchData()
  }, [prop])

  return (
    <div className="lista">
      <Tabela campos={campos} dados={lista} />
    </div>
  )
}
