import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'

const useStyle = makeStyles({
  titulo: {
    margin: '20px',
    textAlign: 'center',
    color: '#3f51b5',
  },
  corpo1: {
    margin: '20px',
    fontSize: '15pt',
    textAlign: 'center',
    color: '#353535',
  },
})

export default function Sobre() {
  const style = useStyle()

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Typography className={style.titulo} variant="h1" component="h2">
          Sobre
        </Typography>
        <Typography className={style.corpo1} variant="body1" component="p">
          A Casa do Código é uma editora que desenvolve livros em diversos
          formatos.
        </Typography>
      </Container>
    </>
  )
}
