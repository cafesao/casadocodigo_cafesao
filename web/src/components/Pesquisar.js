import React, { useState, memo } from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Pesquisar(prop) {
  const [pesquisar, setPesquisar] = useState('')
  const [estadoBotao, setEstadoBotao] = useState()
  const [estadoInput, setEstadoInput] = useState(false)

  const { pesquisarLivroServer, recarregarLivroServer } = prop

  function mudarEstadoInput() {
    if (pesquisar.length > 0) {
      setEstadoInput(true)
    } else {
      setEstadoInput(false)
    }
  }

  function limpaState() {
    setPesquisar('')
    setEstadoInput(false)
  }

  function limpaCampo() {
    document.querySelector('input#pesquisar').value = ''
  }

  function enviarPesquisa(e) {
    e.preventDefault()
    limpaCampo()
    pesquisarLivroServer(pesquisar)
    limpaState()
  }

  function recarregar() {
    function buttonRecarregar() {
      setEstadoBotao(true)
      setTimeout(() => setEstadoBotao(false), 5000)
    }

    buttonRecarregar()
    limpaCampo()
    recarregarLivroServer()
    limpaState()
  }

  return (
    <form onSubmit={enviarPesquisa}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <TextField
            id="pesquisar"
            label="Nome para Pesquisar"
            variant="outlined"
            defaultValue={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
            onFocus={() => setEstadoInput(true)}
            onBlur={mudarEstadoInput}
            InputLabelProps={{ shrink: estadoInput }}
            required
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Pesquisar
          </Button>
        </Grid>
        <Grid item>
          <Button
            id="recarregar"
            variant="contained"
            color="primary"
            disabled={estadoBotao}
            onClick={recarregar}
          >
            Recarregar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default memo(Pesquisar)
