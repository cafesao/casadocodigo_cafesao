//Importando Modulos
import React from 'react'
import LinkWrapper from './LinkWrapper'

//Função Principal
export default function Header() {
  return (
    <nav>
      <div className="nav-wrapper indigo">
        <LinkWrapper to="/" className="brand-logo">
          Casa do Código
        </LinkWrapper>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <LinkWrapper to="/livros">Livros</LinkWrapper>
          </li>
          <li>
            <LinkWrapper to="/autores">Autores</LinkWrapper>
          </li>
          <li>
            <LinkWrapper to="/sobre">Sobre</LinkWrapper>
          </li>
        </ul>
      </div>
    </nav>
  )
}
