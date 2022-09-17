import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getBlogsByUserId } from '../../redux/actions/blogAction'
import { IBlogs, ReduxState, useTypedDispatch } from '../../utils/Typescript'
import BlogItem from '../cards/BlogItem'
// import Pagination from '../Pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const UserBlogs = () => {
  const dispatch = useTypedDispatch()
  const { search } = useLocation()
  const { userId: id } = useParams()
  const navigate = useNavigate()
  const { blogsUser } = useSelector((state: ReduxState) => state)
  const [blogs, setBlogs] = useState<IBlogs[]>()
  const [total, setTotal] = useState(0)
  // const isMounted = useRef(true)
  const handlePagination = (e: any, page: number) => {
    if (!id) return
    const search = `?page=${page}`
    console.log('callback', id, search)
    dispatch(getBlogsByUserId(id, search))
  }
  useEffect(() => {
    // if (isMounted.current) {
    //   isMounted.current = false
    //   return
    // }
    if (!id) return
    if (blogsUser.every((item) => item.id !== id)) {
      dispatch(getBlogsByUserId(id, search))
      console.log('hello 1', id)
    } else {
      const dataRes = blogsUser.find((item) => item.id === id)
      if (!dataRes) return
      console.log('hello 2', id)
      console.log('dataRes', dataRes)
      setBlogs(dataRes.blogs)
      setTotal(dataRes.total)
      if (dataRes.search) navigate(`${dataRes.search}`)
    }
  }, [id, blogsUser, dispatch, search, navigate])

  return (
    <div>
      <Grid
        container
        sx={{
          marginTop: '16px',
          marginBottom: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
        spacing={2}
      >
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog: IBlogs) => (
            <BlogItem blog={blog} isBlogUser={true} key={blog._id} />
          ))}
      </Grid>
      <div className="text-center">
        {/* <Pagination total={total} callback={handlePagination} /> */}
        <Stack spacing={2} sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Pagination
            count={total}
            variant="outlined"
            onChange={handlePagination}
          />
        </Stack>
      </div>
    </div>
  )
}

export default UserBlogs
