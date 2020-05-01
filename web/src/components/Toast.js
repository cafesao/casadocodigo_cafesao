import React from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'

import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  snackbar: {
    marginTop: '50px',
  },
})

export default function Toast({ open, handleClose, children, severity }) {
  const style = useStyle()
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
      className={style.snackbar}
    >
      <Alert onClose={handleClose} variant="filled" severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  )
}
