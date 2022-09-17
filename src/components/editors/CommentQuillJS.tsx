import React from 'react'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css' // ES6
interface IProps {
  body: string
  setBody: (value: string) => void
}
const CommentQuillJS: React.FC<IProps> = ({ body, setBody }) => {
  const onHandleChange = (e: any) => {
    setBody(e)
  }
  const modules = {
    toolbar: {
      container,
    },
  }
  return (
    <>
      <ReactQuill
        modules={modules}
        theme="snow"
        onChange={onHandleChange}
        value={body}
      />{' '}
    </>
  )
}

export default CommentQuillJS
var container = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]
