import React, { Fragment } from 'react'

import Header from '../components/Header'
import Lista from '../components/Lista'

export default function Autores() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Lista prop={'Autores'} />
      </div>
    </Fragment>
  )
}
