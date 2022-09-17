import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { createComment, getComments } from '../../redux/actions/commentAction'
import {
  IBlogs,
  IComment,
  IUser,
  ReduxState,
  useTypedDispatch,
} from '../../utils/Typescript'
import Comments from '../comments/Comments'
import Input from '../comments/Input'
// import Pagination from '../Pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
interface IProps {
  blog: IBlogs
}
const BlogCard: React.FC<IProps> = ({ blog }) => {
  const { auth, comments } = useSelector((state: ReduxState) => state)
  const [showComments, setShowComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(false)
  const dispatch = useTypedDispatch()
  const location = useLocation()
  const handleCommentCb = (body: string) => {
    if (!auth) return
    const data = {
      user: auth.user as IUser | undefined,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)?._id,
      content: body,
      createdAt: new Date().toISOString(),
    }
    setShowComments([data, ...showComments])
    dispatch(createComment(data, auth))
  }
  useEffect(() => {
    if (comments.data.length === 0) return
    setShowComments(comments.data)
  }, [comments.data])
  const fetchComments = useCallback(
    (id: string, num: number = 1) => {
      setLoading(true)
      dispatch(getComments(id, num))
      setLoading(false)
    },
    [dispatch]
  )
  useEffect(() => {
    if (!blog._id) return
    const numPage = Number(location.search.slice(6)) || 1
    fetchComments(blog._id, numPage)
  }, [blog._id, location.search, fetchComments])
  const handlePagination = (e: any, num: number) => {
    if (!blog._id) return
    fetchComments(blog._id, num)
  }
  return (
    <div className="my-10">
      <div className="inline-block relative">
        <div className="absolute inset-0 text-blue-200 flex">
          <svg height="100%" viewBox="0 0 50 100">
            <path
              d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex-grow h-full -ml-px bg-blue-200 rounded-md rounded-l-none"></div>
        </div>
        <span className="relative text-blue-500 uppercase text-sm font-semibold p-1 block">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {typeof blog.category !== 'string' && blog?.category?.name}
          <span>&nbsp;</span>
        </span>
      </div>
      <div className="my-4 text-center ">
        {typeof blog.thumbnail === 'string' && (
          <img className="mx-auto" src={blog.thumbnail} alt="" />
        )}
      </div>
      <h1 className="font-semibold text-3xl text-gray-700 my-4">
        {blog.title}
      </h1>
      <div className="text-left">
        <div className="text-gray-600 text-sm">
          {typeof blog.user !== 'string' && blog.user.name} |{' '}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="italic text-gray-600 text-base my-4">
        {blog.description}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      ></div>
      <div className="my-4">
        <h3 className="text-xl font-semibold mb-3">Comments</h3>
        {auth.user ? (
          <Input handleCommentCb={handleCommentCb} />
        ) : (
          <div>
            Please{' '}
            <NavLink to={`/login?blog/${blog._id}`} className="text-blue-600">
              Login
            </NavLink>{' '}
            to comment
          </div>
        )}
      </div>
      <div className="my-4">
        {loading ? (
          <div className="text-center py-6">Loading....</div>
        ) : (
          showComments.map((item: any, idx: number) => (
            <Comments comment={item} key={idx} />
          ))
        )}
      </div>
      <div className="my-4 text-center"> 
        {/* <Pagination total={comments.total} callback={handlePagination} /> */}
        <Stack spacing={2} sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Pagination
            count={comments.total}
            variant="outlined"
            onChange={handlePagination}
          />
        </Stack>
      </div>
    </div>
  )
}

export default BlogCard
