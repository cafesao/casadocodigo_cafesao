//Importando Modulos
import React from 'react'

//Função Principal
export default function Header() {
  return (
    <nav>
      <div class="nav-wrapper indigo">
        <a href="#" class="brand-logo">
          Casa do Código
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="#">Livros</a>
          </li>
          <li>
            <a href="#">Autores</a>
          </li>
          <li>
            <a href="#">Sobre</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
