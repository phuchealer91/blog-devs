// import Search from '../Search'
import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import { NavLink, useLocation } from 'react-router-dom'
import { getAPI } from '../../utils/FetchData'
import { Avatar, Card, CardHeader } from '@mui/material'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '500px',
    // [theme.breakpoints.up('sm')]: {
    //   width: '500px',
    //   '&:focus': {
    //     width: '540px',
    //   },
    // },
  },
}))
const SearchBlog = () => {
  const [search, setSearch] = React.useState('')
  const [blogs, setBlogs] = React.useState([])
  const { pathname } = useLocation()
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([])
      await getAPI(`search/blogs?title=${search}`)
        .then((res) => {
          setBlogs(res.data.blogs)
        })
        .catch((error) => {
          setBlogs([])
          console.log('error', error)
        })
    }, 400)
    return () => clearTimeout(delayDebounce)
  }, [search])
  useEffect(() => {
    setSearch('')
    setBlogs([])
  }, [pathname])

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
      {search.length > 2 && (
        <div className="absolute">
          <Card
            sx={{
              width: '555px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
          >
            {blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <NavLink to={`/blog/${blog._id}`} key={blog._id}>
                  <CardHeader
                    avatar={<Avatar src={blog?.thumbnail}></Avatar>}
                    title={blog?.title}
                    subheader={blog?.description}
                    sx={{
                      borderBottom: '1px solid #eee',
                    }}
                  />
                </NavLink>
              ))
            ) : (
              <div className="text-center p-6 font-semibold">No posts</div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}

export default SearchBlog
