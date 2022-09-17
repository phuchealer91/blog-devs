import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../../components/cards/BlogForm'
import CardPreview from '../../components/cards/CardPreview'
import ReactQuillJS from '../../components/editors/ReactQuillJS'
import { createBlog, updateBlog } from '../../redux/actions/blogAction'
import { ALERT } from '../../redux/types/alertType'
import { getAPI } from '../../utils/FetchData'
import {
  IBlogs,
  IUser,
  ReduxState,
  useTypedDispatch,
} from '../../utils/Typescript'
import { shallowEqual, ValidCreateBlog } from '../../utils/Vailidation'
interface IProps {
  id?: string
}
const CreateBlog: React.FC<IProps> = ({ id }) => {
  const initalState = {
    title: '',
    user: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString(),
  }
  const [blog, setBlog] = useState<IBlogs>(initalState)
  const [oldData, setOldData] = useState<IBlogs>(initalState)
  const [body, setBody] = useState('')
  const { auth } = useSelector((state: ReduxState) => state)
  const dispatch = useTypedDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!id) return
    getAPI(`/blog/${id}`)
      .then((res) => {
        setBlog(res.data.blog)
        setBody(res.data.blog.content)
        setOldData(res.data.blog)
      })
      .catch((error) => {
        console.log('error', error.message)
      })
    return () => {
      setBlog(initalState)
      setBody('')
      setOldData(initalState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const onHandleSubmit = async () => {
    const divContent = divRef.current
    const text = divContent?.innerText as string
    const check = await ValidCreateBlog({
      ...blog,
      content: text,
    })
    if (check.errLength > 0)
      return dispatch({
        type: ALERT,
        payload: {
          errors: check.errMsg,
        },
      })

    const newData = { ...blog, content: body }
    if (id) {
      const result = shallowEqual(oldData, newData)
      if (result === true)
        return dispatch({
          type: ALERT,
          payload: { errors: 'Data does not change' },
        })
      if ((blog.user as IUser)._id !== auth.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: 'Invalid Authentication' },
        })
      dispatch(updateBlog(newData, auth))
    } else {
      dispatch(createBlog(newData, auth))
    }
  }
  return (
    <div className="max-w-screen-xl px-4 mx-auto  md:px-6 lg:px-8">
      <div className="flex mt-10">
        <div className="w-3/5 mr-2 ">
          <h3 className="text-xl font-semibold">
            {id ? 'Update blog' : 'Create blog'}
          </h3>
          <BlogForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="w-2/5 ml-2">
          <h3 className="text-xl font-semibold">Preview</h3>
          <CardPreview blog={blog} />
        </div>
      </div>
      <div className="mb-10">
        <ReactQuillJS setBody={setBody} body={body} />
      </div>
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      ></div>
      <div className="mt-3 mb-10 text-center mx-auto">
        <button
          type="submit"
          onClick={onHandleSubmit}
          className="bg-green-600 text-white  rounded px-4 py-2 w-auto"
          // disabled={!name || !account || !password ? true : false}
        >
          {id ? 'Update post' : ' Create post'}
        </button>
      </div>
    </div>
  )
}

export default CreateBlog
