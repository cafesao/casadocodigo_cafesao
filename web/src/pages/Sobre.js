import React, { Fragment } from 'react'

import Header from '../components/Header'

export default function Sobre() {
  return (
    <div className="sobre">
      <Fragment>
        <Header />
        <div className="center">
          <h2>Sobre</h2>
          <h3>Feito em React</h3>
        </div>
      </Fragment>
    </div>
  )
}
