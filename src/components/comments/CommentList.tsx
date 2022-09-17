import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  replyComment,
  updateComment,
  deleteComment,
} from '../../redux/actions/commentAction'
import {
  IComment,
  IUser,
  ReduxState,
  useTypedDispatch,
} from '../../utils/Typescript'
import IconTooltip from '../common/IconTooltip'
import Input from './Input'
interface IProps {
  comment: IComment
  user: IUser
  showReply: IComment[]
  setShowReply: (showReply: IComment[]) => void
}
const CommentList: React.FC<IProps> = ({
  comment,
  user,
  showReply,
  setShowReply,
}) => {
  const [isReply, setIsReply] = useState(false)
  const [edit, setEdit] = useState<IComment>()
  const dispatch = useTypedDispatch()
  const { auth } = useSelector((state: ReduxState) => state)
  const handleReplyComment = (body: string) => {
    if (!auth.user || !auth.token) return
    const data = {
      user: auth?.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      comment_root: comment.comment_root || comment._id,
      reply_user: comment.user,
      content: body,
      createdAt: new Date().toISOString(),
    }
    setShowReply([...showReply, data])
    dispatch(replyComment(data, auth.token))
    setIsReply(false)
  }
  const handleUpdateComment = (body: string) => {
    if (!auth.user || !auth.token || !edit) return
    if (body === edit.content) return setEdit(undefined)
    const newComment = { ...edit, content: body }
    dispatch(updateComment(newComment, auth.token))
    setEdit(undefined)
  }
  const handleDelete = (data: IComment) => {
    if (!auth.user || !auth.token) return
    dispatch(deleteComment(data, auth.token))
  }

  const Actions = (comment: IComment) => {
    return (
      <span className="mx-3">
        <span onClick={() => setEdit(comment)}>
          <IconTooltip
            icon={<EditIcon color="success" fontSize="small" />}
            title="Edit"
          />
        </span>{' '}
        |{' '}
        <span onClick={() => handleDelete(comment)}>
          <IconTooltip
            icon={<DeleteIcon color="error" fontSize="small" />}
            title="Delete"
          />
        </span>
      </span>
    )
  }
  return (
    <>
      <div className="flex mb-3">
        <span className="font-semibold hover:text-blue-600 hover:underline">
          <NavLink to={`/profile/${user._id}`}>{user?.name}</NavLink>
        </span>

        <div className="ml-auto text-sm">
          <span>
            {comment.blog_user_id === auth.user?._id ? (
              comment.user?._id === auth.user._id ? (
                Actions(comment)
              ) : (
                <span onClick={() => handleDelete(comment)}>
                  <IconTooltip
                    icon={<DeleteIcon color="error" fontSize="small" />}
                    title="Delete"
                  />
                </span>
              )
            ) : (
              comment.user?._id === auth.user?._id && Actions(comment)
            )}
          </span>
          {new Date(comment?.createdAt).toLocaleString()}
        </div>
      </div>
      {edit ? (
        <Input
          handleCommentCb={handleUpdateComment}
          edit={edit}
          setEdit={setEdit}
        />
      ) : (
        <>
          <p
            className="mt-1"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
          ></p>
          <div className="flex my-4">
            {
              <button
                className="text-sm font-semibold"
                onClick={() => setIsReply(!isReply)}
              >
                {isReply ? 'Cancel' : 'Reply'}
              </button>
            }
          </div>
        </>
      )}
      {isReply && <Input handleCommentCb={handleReplyComment} />}
    </>
  )
}

export default CommentList
