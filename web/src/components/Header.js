//Importando Modulos
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyle = makeStyles({
  titulo: {
    fontSize: '32pt',
    textDecoration: 'none',
    color: 'white',
    padding: '5px',
    whiteSpace: 'nowrap',
  },
  link: {
    fontSize: '17pt',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
    padding: '10px',
  },
  gridItem: {
    paddingRight: '50px',
  },
})

//Função Principal
function Header() {
  const style = useStyle()

  return (
    <AppBar position="static">
      <ToolBar>
        <NavLink to="/" className={style.titulo}>
          Casa do Código
        </NavLink>
        <Grid
          container
          spacing={3}
          justify="flex-end"
          alignItems="center"
          className={style.gridItem}
        >
          <Grid item>
            <NavLink to="/livros" className={style.link}>
              Livros
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/autores" className={style.link}>
              Autores
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/sobre" className={style.link}>
              Sobre
            </NavLink>
          </Grid>
        </Grid>
      </ToolBar>
    </AppBar>
  )
}

export default memo(Header)
