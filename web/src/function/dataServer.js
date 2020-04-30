import axios from 'axios'

export default async function dataServer(tipo, data = {}, nome = '') {
  if (tipo === 'get' && nome === '') {
    try {
      const axiosData = await axios[tipo]('http://localhost:3001/api/livros')
      return axiosData.data
    } catch (err) {
      console.log(err)
      return 'erro'
    }
  } else if (tipo === 'get' && nome !== '') {
    try {
      const axiosData = await axios[tipo](
        `http://localhost:3001/api/livros/${nome}`,
      )
      return axiosData.data
    } catch (err) {
      console.log(err)
      return 'erro'
    }
  } else if (tipo === 'post') {
    try {
      await axios[tipo]('http://localhost:3001/api/livros', data)
      return 'ok'
    } catch (err) {
      console.log(err)
      return 'erro'
    }
  } else if (tipo === 'put') {
    try {
      await axios[tipo](`http://localhost:3001/api/livros/${nome}`, data)
      return 'ok'
    } catch (err) {
      console.log(err)
      return 'erro'
    }
  } else if (tipo === 'delete') {
    try {
      await axios[tipo](`http://localhost:3001/api/livros/${nome}`)
      return 'ok'
    } catch (err) {
      console.log(err)
      return 'erro'
    }
  }
}
