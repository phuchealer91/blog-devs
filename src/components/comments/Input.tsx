import React, { useEffect, useRef, useState } from 'react'
import { IComment } from '../../utils/Typescript'
import CommentQuillJS from '../editors/CommentQuillJS'
interface IProps {
  handleCommentCb: (body: string) => void
  edit?: IComment
  setEdit?: (edit?: IComment) => void
}
const Input: React.FC<IProps> = ({ handleCommentCb, edit, setEdit }) => {
  const [body, setBody] = useState('')
  const divRef = useRef<HTMLDivElement>(null)
  const handleSubmit = () => {
    const div = divRef.current
    const text = div?.innerText as string
    if (!text.trim()) {
      if (setEdit) return setEdit(undefined)
      return
    }
    setBody('')
    handleCommentCb(body)
  }
  useEffect(() => {
    if (edit) setBody(edit.content)
  }, [edit])
  return (
    <div>
      <CommentQuillJS body={body} setBody={setBody} />
      <div
        ref={divRef}
        className="hidden"
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      ></div>
      <div className="text-right  mt-3">
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-green-600 text-white w-[2/5]  rounded px-4 py-2 "
          // disabled={!account || !password ? true : false}
        >
          {edit ? 'Update' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default Input
