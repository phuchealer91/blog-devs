import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import GridViewIcon from '@mui/icons-material/GridView'
import Logout from '@mui/icons-material/Logout'
import { Button, Tab, Tabs } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../redux/actions/authAction'
import { ReduxState, useTypedDispatch } from '../../utils/Typescript'

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { auth } = useSelector((state: ReduxState) => state)
  const dispatch = useTypedDispatch()
  const onHanldeLogout = () => {
    if (!auth.token || !auth.user) return
    dispatch(logOut(auth.token))
  }
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {auth.token ? (
          <>
            <Tabs
              sx={{
                '&& .Mui-selected': {
                  // && are used to increase the specificity
                  color: '#d1d1d1',
                  marginRight: '16px',
                },
              }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              {' '}
              <NavLink to="/blog">
                <Tab label="Create blog" />
              </NavLink>
            </Tabs>
          </>
        ) : (
          <>
            <Button sx={{ marginLeft: '10px' }} variant="contained">
              <NavLink to="/login">Login</NavLink>
            </Button>
            <Button sx={{ marginLeft: '10px' }} variant="contained">
              <NavLink to="/register">Register</NavLink>
            </Button>
          </>
        )}

        {auth.user && (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              // id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{ width: 300 }}
            >
              <NavLink to={`/profile/${auth?.user?._id}`}>
                <MenuItem>
                  <AccountCircleIcon
                    fontSize="small"
                    sx={{ marginRight: '12px', color: '#999' }}
                  />{' '}
                  Profile
                </MenuItem>
              </NavLink>
              {auth.user.role === 'admin' && (
                <NavLink to="/category">
                  <MenuItem>
                    <GridViewIcon
                      fontSize="small"
                      sx={{ marginRight: '12px', color: '#999' }}
                    />{' '}
                    Category
                  </MenuItem>
                </NavLink>
              )}

              <Divider sx={{ marginTop: '6px', marginBottom: '6px' }} />

              <MenuItem onClick={onHanldeLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </React.Fragment>
  )
}

export default MenuDropdown
