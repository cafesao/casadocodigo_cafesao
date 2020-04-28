import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './pages/Main'
import Livros from './pages/Livros'
import Autores from './pages/Autores'
import Sobre from './pages/Sobre'
import NotFound from './pages/NotFound'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/livros" component={Livros} />
        <Route path="/autores" component={Autores} />
        <Route path="/sobre" component={Sobre} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
