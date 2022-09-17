import React, { useCallback, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css' // ES6
import { ALERT } from '../../redux/types/alertType'
import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { useTypedDispatch } from '../../utils/Typescript'
interface IProps {
  body: string
  setBody: (value: string) => void
}
const ReactQuillJS: React.FC<IProps> = ({ body, setBody }) => {
  const quillRef = useRef<ReactQuill>(null)
  const dispatch = useTypedDispatch()
  const onHandleChange = (e: any) => {
    setBody(e)
  }
  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()
    input.onchange = async () => {
      const files = input.files
      if (!files)
        return dispatch({
          type: ALERT,
          payload: {
            errors: 'File does not exists',
          },
        })
      const file = files[0]
      const check = checkImage(file)
      if (check)
        return dispatch({
          type: ALERT,
          payload: {
            errors: check,
          },
        })
      dispatch({
        type: ALERT,
        payload: {
          loading: true,
        },
      })
      const photo = await imageUpload(file)
      const quill = quillRef.current
      const range = quill?.getEditor().getSelection()?.index
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
      }
      dispatch({
        type: ALERT,
        payload: {
          loading: false,
        },
      })
    }
  }, [dispatch])
  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    let toolbar = quill.getEditor().getModule('toolbar')
    toolbar.addHandler('image', handleChangeImage)
  }, [handleChangeImage])
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
        ref={quillRef}
        value={body}
      />{' '}
    </>
  )
}

export default ReactQuillJS
var container = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'image', 'video'],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]
