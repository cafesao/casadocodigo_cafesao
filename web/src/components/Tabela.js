import React, { useState, useEffect, memo } from 'react'

import uuid from 'react-uuid'

import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import Button from '@material-ui/core/Button'

import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { useTheme, makeStyles } from '@material-ui/core/styles'

import dataServer from '../function/dataServer'

function Tabela(props) {
  const { campos, dados, removerLivroPagina, adicionarLivroModf } = props

  const [rolagemPagina, setRolagemPagina] = useState(5)
  const [pagina, setPagina] = useState(0)

  const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }))

  function TablePaginationActions(props) {
    const classes = useStyles1()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0)
    }

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }

  function handleChangePage(e, newPage) {
    setPagina(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRolagemPagina(parseInt(event.target.value, 10))
    setPagina(0)
  }

  function BotaoRemover(params) {
    const { nome, index, removerLivroPagina } = params

    if (!removerLivroPagina) return null

    return (
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => mudarValorModf([nome, index, 'remover'])}
        >
          Remover
        </Button>
      </TableCell>
    )
  }

  function TituloRemover(params) {
    const { removerLivroPagina } = params

    if (!removerLivroPagina) return null

    return <TableCell>Remover</TableCell>
  }

  function BotaoModificar(params) {
    const { nome, index, adicionarLivroModf } = params

    if (!adicionarLivroModf) return null

    return (
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => mudarValorModf([nome, index, 'modificar'])}
        >
          Modificar
        </Button>
      </TableCell>
    )
  }

  function TituloModificar(params) {
    const { adicionarLivroModf } = params

    if (!adicionarLivroModf) return null

    return <TableCell>Modificar</TableCell>
  }

  function mudarValorModf(array) {
    async function removerLivroServer() {
      await dataServer('delete', {}, array[0])
    }

    if (array[2] === 'remover') {
      removerLivroServer()
      removerLivroPagina(array[1])
    } else if (array[2] === 'modificar') {
      adicionarLivroModf(array[1], dados)
    }
  }

  useEffect(() => {
    setPagina(0)
  }, [dados])

  return (
    <Table>
      <TableHead>
        <TableRow>
          {campos.map((valor, index) => (
            <TableCell key={index}>{valor.titulo}</TableCell>
          ))}
          <TituloModificar adicionarLivroModf={adicionarLivroModf} />
          <TituloRemover removerLivroPagina={removerLivroPagina} />
        </TableRow>
      </TableHead>
      <TableBody>
        {(rolagemPagina > 0
          ? dados.slice(
              pagina * rolagemPagina,
              pagina * rolagemPagina + rolagemPagina,
            )
          : dados
        ).map((dado, index) => (
          <TableRow key={dado._id}>
            {campos.map((valor) => (
              <TableCell key={uuid()}>{dado[valor.prop]}</TableCell>
            ))}
            <BotaoModificar
              nome={dado.nome}
              index={dado._id}
              adicionarLivroModf={adicionarLivroModf}
            />
            <BotaoRemover
              nome={dado.nome}
              index={dado._id}
              removerLivroPagina={removerLivroPagina}
            />
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={dados.length}
            rowsPerPage={rolagemPagina}
            page={pagina}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default memo(Tabela)

/*
dados.map((dado, index) => (
              <TableRow key={dado._id}>
                {campos.map((valor) => (
                  <TableCell key={uuid()}>{dado[valor.prop]}</TableCell>
                ))}
                <BotaoModificar
                  nome={dado.nome}
                  index={index}
                  adicionarLivroModf={adicionarLivroModf}
                />
                <BotaoRemover
                  nome={dado.nome}
                  index={index}
                  removerLivroPagina={removerLivroPagina}
                />
              </TableRow>
*/
