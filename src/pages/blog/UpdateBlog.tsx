import React from 'react'
import { useParams } from 'react-router-dom'
import CreateBlog from './CreateBlog'

const UpdateBlog = () => {
  const { id } = useParams()

  return (
    <div className="max-w-screen-xl px-4 mx-auto  md:px-6 lg:px-8">
      <CreateBlog id={id} />
    </div>
  )
}

export default UpdateBlog
