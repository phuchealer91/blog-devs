import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React from 'react'
interface IProps {
  isOpenConfirm: boolean
  setIsOpenConfirm: (isOpenConfirm: boolean) => void
  confirmTitle?: string
  confirmDesc?: string
  onHandleSubmit: any
}
const DialogConfirm: React.FC<IProps> = ({
  isOpenConfirm,
  setIsOpenConfirm,
  confirmTitle,
  confirmDesc,
  onHandleSubmit,
}) => {
  return (
    <>
      <Dialog
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          minWidth: '400px',
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {confirmTitle ? confirmTitle : 'Confirm data deletion'}
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: '450px',
          }}
        >
          <DialogContentText id="alert-dialog-description">
            {confirmDesc
              ? confirmDesc
              : 'Are you sure you want to delete this data?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: '#ccc',
              color: 'white',
              '&:hover': {
                backgroundColor: '#bbb',
              },
            }}
            onClick={() => setIsOpenConfirm(false)}
          >
            No
          </Button>
          <Button
            sx={{
              backgroundColor: '#07bc0c',
              color: 'white',
              '&:hover': {
                backgroundColor: 'green',
              },
            }}
            onClick={onHandleSubmit}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogConfirm
