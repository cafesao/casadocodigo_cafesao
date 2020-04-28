import React, { Fragment } from 'react'

import Header from '../components/Header'
import Lista from '../components/Lista'

export default function Livros() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Lista prop={'Livros'} />
      </div>
    </Fragment>
  )
}
