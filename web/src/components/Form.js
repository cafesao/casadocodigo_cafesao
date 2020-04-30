import React, { useState, useEffect, memo } from 'react'
import { useAlert } from 'react-alert'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import dataServer from '../function/dataServer'

function Form(props) {
  const alert = useAlert()

  const [_id, set_Id] = useState('')
  const [nome, setNome] = useState('')
  const [autor, setAutor] = useState('')
  const [anoLancamento, setAnoLancamento] = useState('')
  const [preco, setPreco] = useState('')
  const [acao, setAcao] = useState('post')

  const [estadoInput, setEstadoInput] = useState(false)

  const Data = new Date()

  const { adicionarLivroPagina, modificarLivroPagina, buscarLivroModf } = props

  let livroModf = buscarLivroModf()

  function mudaEstadoInput() {
    if (
      nome.length > 0 ||
      autor.length > 0 ||
      anoLancamento.length > 0 ||
      preco.length > 0
    ) {
      setEstadoInput(true)
    } else {
      setEstadoInput(false)
    }
  }

  function modificaStatesInput(
    obj = { _id: '', nome: '', autor: '', anoLancamento: '', preco: '' },
  ) {
    set_Id(obj._id)
    setNome(obj.nome)
    setAutor(obj.autor)
    setAnoLancamento(obj.anoLancamento)
    setPreco(obj.preco)
  }

  useEffect(() => {
    function modificaCamposInput(obj) {
      setEstadoInput(true)

      let inputNome = document.querySelector('input#nome')
      inputNome.value = obj.nome
      inputNome.setAttribute('disabled', true)

      document.querySelector('input#autor').value = obj.autor
      document.querySelector('input#anoLancamento').value = obj.anoLancamento
      document.querySelector('input#preco').value = obj.preco
    }

    if (livroModf.length > 0) {
      modificaStatesInput(livroModf[0])
      modificaCamposInput(livroModf[0])

      setAcao('put')
    }
  }, [livroModf])

  async function inserirLivroServer(e) {
    function prepararObjeto(boolean) {
      if (boolean) {
        return {
          nome,
          autor,
          anoLancamento: parseInt(anoLancamento),
          preco: parseFloat(preco),
        }
      } else {
        return {
          _id,
          nome,
          autor,
          anoLancamento: parseInt(anoLancamento),
          preco: parseFloat(preco),
        }
      }
    }

    function limparCampos() {
      let inputNome = document.querySelector('input#nome')
      inputNome.value = ''
      inputNome.removeAttribute('disabled')

      document.querySelector('input#autor').value = ''
      document.querySelector('input#anoLancamento').value = ''
      document.querySelector('input#preco').value = ''
    }

    async function addPut() {
      const data = await dataServer('put', objLivro, objLivro.nome)
      if (data === 'erro')
        alert.error('Tivemos um problema ao modificar seu livro!')
      else {
        limparCampos()

        setEstadoInput(false)

        objLivro = prepararObjeto(false)

        modificarLivroPagina(objLivro)

        setAcao('post')
      }
    }

    async function addPost() {
      const data = await dataServer('post', objLivro)
      if (data === 'erro')
        alert.error('Tivemos um problema ao modificar seu livro!')
      else {
        limparCampos()

        setEstadoInput(false)

        objLivro = prepararObjeto(false)

        adicionarLivroPagina(objLivro)
      }
    }
    e.preventDefault()

    let objLivro = prepararObjeto(true)

    if (acao === 'put') addPut()
    else addPost()
    modificaStatesInput()
  }

  return (
    <form onSubmit={inserirLivroServer}>
      <Grid container spacing={4} alignItems="center">
        <Grid item>
          <TextField
            id="nome"
            label="Nome do Livro"
            variant="outlined"
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
            onFocus={() => setEstadoInput(true)}
            onBlur={mudaEstadoInput}
            InputLabelProps={{ shrink: estadoInput }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="autor"
            label="Nome do Autor"
            variant="outlined"
            defaultValue={autor}
            onChange={(e) => setAutor(e.target.value)}
            onFocus={() => setEstadoInput(true)}
            onBlur={mudaEstadoInput}
            InputLabelProps={{ shrink: estadoInput }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="anoLancamento"
            label="Ano do Lançamento"
            variant="outlined"
            type="number"
            defaultValue={anoLancamento}
            onChange={(e) => {
              setAnoLancamento(e.target.value)
              setEstadoInput(true)
            }}
            onFocus={() => setEstadoInput(true)}
            onBlur={mudaEstadoInput}
            inputProps={{ min: 1800, max: Data.getFullYear(), step: 1 }}
            InputLabelProps={{ shrink: estadoInput }}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="preco"
            label="Preço do Livro"
            variant="outlined"
            type="number"
            defaultValue={preco}
            onChange={(e) => {
              setPreco(e.target.value)
              setEstadoInput(true)
            }}
            onFocus={() => setEstadoInput(true)}
            onBlur={mudaEstadoInput}
            inputProps={{ min: 1, max: 1000, step: 0.01 }}
            InputLabelProps={{ shrink: estadoInput }}
            required
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default memo(Form)
