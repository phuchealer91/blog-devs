import React from 'react'
import { useSelector } from 'react-redux'
import { IBlogs, InputChange, ReduxState } from '../../utils/Typescript'
interface IProps {
  blog: IBlogs
  setBlog: (blog: IBlogs) => void
}
const BlogForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { categories } = useSelector((state: ReduxState) => state)
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setBlog({ ...blog, [name]: value })
  }
  const handleChangeInputFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      const file = files[0]
      setBlog({ ...blog, thumbnail: file })
    }
  }
  return (
    <div>
      <form>
        <div className="my-3 w-full">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={blog.title}
            onChange={handleChangeInput}
            className="mt-1 px-4 py-2 rounded border w-full"
          />
        </div>
        <div className="my-3 w-full">
          <label htmlFor="thumbnail">Image</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChangeInputFile}
            className="mt-1 px-4 py-2 rounded border w-full"
          />
        </div>
        <div className="my-3 w-full">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={blog.description}
            onChange={handleChangeInput}
            className="mt-1 px-4 py-2 rounded border w-full"
            rows={4}
          ></textarea>
        </div>
        <div className="my-3 w-full">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={blog.category._id}
            onChange={handleChangeInput}
            className="mt-1 px-4 py-2 rounded border w-full"
          >
            <option value="">-- Choose category --</option>
            {categories &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
