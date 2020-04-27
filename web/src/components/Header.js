//Importando Modulos
import React from 'react'

//Função Principal
export default function Header() {
  return (
    <nav>
      <div className="nav-wrapper indigo">
        <a href="www.google.com.br" className="brand-logo">
          Casa do Código
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="www.google.com.br">Livros</a>
          </li>
          <li>
            <a href="www.google.com.br">Autores</a>
          </li>
          <li>
            <a href="www.google.com.br">Sobre</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
