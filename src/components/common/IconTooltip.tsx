import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

interface IProps {
  icon: React.ReactNode
  title: string
  onHandleSubmit?: any
}
const IconTooltip: React.FC<IProps> = ({ icon, title, onHandleSubmit }) => {
  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={onHandleSubmit}>{icon}</IconButton>
      </Tooltip>
    </>
  )
}

export default IconTooltip
