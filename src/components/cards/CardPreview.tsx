import React from 'react'
import { Link } from 'react-router-dom'
import { IBlogs } from '../../utils/Typescript'
interface IProps {
  blog: IBlogs
}
const CardPreview: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="relative">
      <div className="pb-[62.5%] relative block">
        <div className="absolute top-0 right-0 bottom-0 left-0">
          {blog.thumbnail && (
            <>
              {typeof blog.thumbnail === 'string' ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.thumbnail}
                    alt=""
                    className="rounded object-cover absolute w-0 h-0 min-h-full max-h-full min-w-full max-w-full "
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  alt=""
                  className="rounded object-cover absolute w-0 h-0 min-h-full max-h-full min-w-full max-w-full "
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-2 text-lg text-gray-700 font-semibold ">
        {blog.title}
      </div>
      <div className="mt-2 text-base text-gray-600">{blog.description}</div>
      <div className="mt-2 text-right text-gray-600">{blog.createdAt}</div>
    </div>
  )
}

export default CardPreview
