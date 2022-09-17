import React from 'react'
import { NavLink } from 'react-router-dom'
// import Search from '../Search'
import DataObjectIcon from '@mui/icons-material/DataObject'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import DrawerComp from './Drawer'
import MenuDropdown from './Menu'
import SearchBlog from './SearchBlog'

const Header = () => {
  const theme = useTheme()
  console.log(theme)
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  console.log(isMatch)

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#065f46', position: 'relative' }}>
        <Toolbar>
          <NavLink to="/">
            <DataObjectIcon sx={{ fontSize: '2rem' }} />
          </NavLink>

          {isMatch ? (
            <>
              <Typography sx={{ fontSize: '2rem' }}>
                <NavLink
                  to="/"
                  className="text-lg font-semibold tracking-widest text-white uppercase "
                >
                  Blog DEV
                </NavLink>
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Box sx={{ marginLeft: 'auto' }}>
                <SearchBlog />
              </Box>
              <MenuDropdown />
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
