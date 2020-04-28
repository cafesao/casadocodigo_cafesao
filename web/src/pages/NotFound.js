import React, { Fragment } from 'react'

import Header from '../components/Header'

export default function NotFound() {
  return (
    <div className="notFound">
      <Fragment>
        <Header />
        <h1>Erro 404!</h1>
        <h2>Não foi possivel encontrar a sua pagina!</h2>
      </Fragment>
    </div>
  )
}
