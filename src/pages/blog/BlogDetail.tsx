import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BlogCard from '../../components/cards/BlogCard'
import { getAPI } from '../../utils/FetchData'
import { IBlogs } from '../../utils/Typescript'

const BlogDetail = () => {
  const { id } = useParams()
  // const isMounted = useRef(true)
  const [blog, setBlog] = useState<IBlogs>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // if (isMounted.current) {
    //   isMounted.current = false
    //   return
    // }
    if (!id) return
    setLoading(true)
    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data.blog)
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error.message)
        setLoading(false)
      })
  }, [id])
  return (
    <div className="max-w-screen-xl px-4 mx-auto  md:px-6 lg:px-8">
      {!loading && blog && <BlogCard blog={blog} />}
    </div>
  )
}

export default BlogDetail
