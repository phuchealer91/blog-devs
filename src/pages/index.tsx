import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import BlogItem from '../components/cards/BlogItem'
import { titleCase } from '../utils/FormatData'
import { IBlogs, ReduxState } from '../utils/Typescript'
const Home = () => {
  const { homeBlogs } = useSelector((state: ReduxState) => state)
  return (
    <Box
      sx={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      <Grid style={{ margin: 20 }}>
        <Typography variant="h4">
          <strong>Listing posts</strong>
        </Typography>
      </Grid>
      {homeBlogs.map((item: any, idx: number) => (
        <>
          <Box key={idx} className="mt-3">
            <Typography
              variant="h6"
              className="font-semibold text-gray-600"
              sx={{
                marginLeft: '20px',
              }}
            >
              <Link to={`/blogs/${item.slug}`} className="hover:text-green-600">
                {titleCase(item.name)} ({item.count})
              </Link>
            </Typography>
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
              {item.blogs.length > 0 &&
                item.blogs.map((blog: IBlogs) => (
                  <BlogItem blog={blog} isBlogUser={false} key={blog._id} />
                ))}
            </Grid>
          </Box>

          {item.count > 4 && (
            <Link
              to={`/blogs/${item.name}`}
              className="hover:underline text-green-600 text-base font-semibold mt-4 ml-5"
            >
              See more &gt; &gt;
            </Link>
          )}
        </>
      ))}
    </Box>
  )
}

export default Home
