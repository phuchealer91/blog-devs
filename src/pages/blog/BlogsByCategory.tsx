import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BlogItem from '../../components/cards/BlogItem'
// import Pagination from '../../components/Pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { getBlogsByCategoryId } from '../../redux/actions/blogAction'
import { IBlogs, ReduxState, useTypedDispatch } from '../../utils/Typescript'

const BlogsByCategory = () => {
  const { categories, categoryBlogs } = useSelector(
    (state: ReduxState) => state
  )
  const { slug } = useParams()
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const [categoryId, setCategoryId] = useState('')
  const [blogs, setBlogs] = useState<IBlogs[]>()
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (!slug) return
    const category = categories.find((item: any) => item.slug === slug)
    if (category) setCategoryId(category._id)
  }, [slug, categories])
  useEffect(() => {
    if (!categoryId) return
    if (categoryBlogs.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId, search))
    } else {
      const dataRes = categoryBlogs.find((item) => item.id === categoryId)
      if (!dataRes) return
      setBlogs(dataRes.blogs)
      setTotal(dataRes.total)
      // Check luu tam thoi diem User da select toi trang do
      if (dataRes.search) navigate(`${dataRes.search}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, categoryBlogs, dispatch, search])
  const handlePagination = (e: any, page: number) => {
    const search = `?page=${page}`
    dispatch(getBlogsByCategoryId(categoryId, search))
  }
  return (
    <div className="max-w-screen-xl px-4 mx-auto  md:px-6 lg:px-8">
      {/* <h3 className="text-lg font-semibold text-gray-600">
              
            </h3> */}
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
            <BlogItem blog={blog} isBlogUser={false} key={blog._id} />
          ))}
      </Grid>
      <div>
        {/* <Pagination total={total} callback={handlePagination} /> */}
      </div>

      <Stack spacing={2}>
        <Pagination
          count={total}
          variant="outlined"
          onChange={handlePagination}
        />
      </Stack>
    </div>
  )
}

export default BlogsByCategory
