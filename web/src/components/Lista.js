import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'

import '../css/lista.css'

import dataServer from '../function/dataServer'

export default function Lista(props) {
  const alert = useAlert()

  const [lista, setLista] = useState([])

  const { prop } = props

  function Lista() {
    const retornoLista = lista.map((nome, index) => {
      return (
        <tr key={index}>
          <td>{nome}</td>
        </tr>
      )
    })

    return <tbody>{retornoLista}</tbody>
  }

  useEffect(() => {
    let propFormated

    if (prop === 'Livros') propFormated = 'nome'
    else if (prop === 'Autores') propFormated = 'autor'

    async function fetchData(propFormated) {
      const axiosData = await dataServer('get')

      if (axiosData === 'error') {
        alert.error('Tivemos um problema ao se conectar com o server')
      } else {
        const objectData = axiosData.map((valor) => {
          return valor[propFormated]
        })
        setLista(objectData)
      }
    }

    fetchData(propFormated)
  }, [prop])

  return (
    <div className="lista">
      {lista ? (
        <table className="centered striped responsive-table">
          <thead>
            <tr>
              <th>{prop}</th>
            </tr>
          </thead>
          <Lista />
        </table>
      ) : (
        //Circulo de carregamento
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
