import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'

import '../css/lista.css'

export default function Lista(props) {
  const alert = useAlert()

  const [lista, setLista] = useState([])

  const { prop } = props

  function mostrarAlerta(msng, tipo = 'success') {
    alert[tipo](msng)
  }

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
      try {
        const axiosData = await axios.get('http://localhost:3001/api/livros')

        //Pega apenas o que se quer do Object axiosData
        const objectData = axiosData.data.map((valor) => {
          return valor[propFormated]
        })

        setLista(objectData)
      } catch (err) {
        mostrarAlerta(
          'Tivemos um problema ao se conectar com o server',
          'error',
        )
      }
    }
    fetchData(propFormated)
  }, [])

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
