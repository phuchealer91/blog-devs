import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { limitData } from '../../utils/FormatData'
import { IBlogs, ReduxState, useTypedDispatch } from '../../utils/Typescript'
import { Box, Grid } from '@mui/material'
import IconTooltip from '../common/IconTooltip'
import { deleteBlog } from '../../redux/actions/blogAction'
import { ALERT } from '../../redux/types/alertType'
interface IProps {
  blog: IBlogs
  isBlogUser: boolean
}

const BlogItem: React.FC<IProps> = ({ blog, isBlogUser }) => {
  const { auth } = useSelector((state: ReduxState) => state)
  const { userId } = useParams()
  const dispatch = useTypedDispatch()
  const onHandleDeleteBlog = () => {
    if (!auth.token || !auth.user) return
    if (userId !== auth.user._id)
      dispatch({
        type: ALERT,
        payload: { errors: 'Invalid Authentication' },
      })
    dispatch(deleteBlog(blog, auth))
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={isBlogUser ? 6 : 4} lg={isBlogUser ? 6 : 3}>
        <Card
          sx={{
            maxWidth: '100%',
            margin: 'auto',

            transition: '0.3s',
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
            '&:hover': {
              boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
            },
          }}
        >
          <Link to={`/blog/${blog._id}`}>
            {typeof blog?.thumbnail === 'string' && (
              <CardMedia
                sx={{
                  paddingTop: '56.25%',
                }}
                image={blog?.thumbnail}
              />
            )}
          </Link>

          <CardContent
            sx={{
              textAlign: 'left',
              padding: '16px',
              marginTop: 'auto',
              minHeight: '210px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              className={'MuiTypography--heading'}
              variant={'h6'}
              gutterBottom
            >
              {blog.title}
            </Typography>
            <Typography
              className={'MuiTypography--subheading'}
              variant={'caption'}
            >
              {limitData(blog.description)}
            </Typography>
            <Divider
              sx={{
                margin: 'auto 0 12px 0',
              }}
              light
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {typeof blog.user !== 'string' && (
                  <>
                    {userId && auth.user?._id === blog.user._id ? (
                      <>
                        <Link
                          to={`/profile/${blog.user._id}`}
                          className="text-blue-500 hover:text-blue-600 hover:underline"
                        >
                          By {blog.user.name}
                        </Link>{' '}
                        |{' '}
                        <Link
                          to={`/update-blog/${blog._id}`}
                          className="text-blue-500 hover:text-blue-600 hover:underline"
                        >
                          <IconTooltip
                            title="Edit"
                            icon={<EditIcon color="success" fontSize="small" />}
                          />
                        </Link>
                        <span className="ml-1">
                          <IconTooltip
                            title="Delete"
                            icon={<DeleteIcon color="error" fontSize="small" />}
                            onHandleSubmit={onHandleDeleteBlog}
                          />
                        </span>
                      </>
                    ) : (
                      <Link
                        to={`/profile/${blog.user._id}`}
                        className="text-blue-500 hover:text-blue-600 hover:underline"
                      >
                        By {blog.user.name}
                      </Link>
                    )}
                  </>
                )}
              </Box>
              <Box className="text-gray-600">
                {new Date(blog.createdAt).toLocaleDateString()}
              </Box>
            </Box>
            {/* <Avatar
              sx={{
                display: 'inline-block',
                border: '2px solid white',
                '&:not(:first-of-type)': {
                  marginLeft: '12px',
                },
              }}
            /> */}
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default BlogItem
