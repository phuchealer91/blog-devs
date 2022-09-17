import React, { useState, useEffect } from 'react'
import { IComment } from '../../utils/Typescript'
import AvatarComment from './AvatarComment'
import AvatarReplyComment from './AvatarReplyComment'
import CommentList from './CommentList'
interface IProps {
  comment: any
}
const Comments: React.FC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([])
  const [next, setNext] = useState(2)
  useEffect(() => {
    if (!comment.reply_cmt) return
    setShowReply(comment.reply_cmt)
  }, [comment.reply_cmt])
  return (
    <div className="border-b border-gray-300">
      <div
        className="flex w-auto p-4 "
        style={{
          opacity: comment._id ? 1 : 0.5,
          pointerEvents: comment._id ? 'initial' : 'none',
        }}
      >
        {typeof comment.user !== 'string' && (
          <AvatarComment user={comment.user} />
        )}
        <div className="flex flex-col flex-grow ml-4">
          <CommentList
            comment={comment}
            user={comment.user}
            showReply={showReply}
            setShowReply={setShowReply}
          />
        </div>
      </div>
      {showReply.slice(0, next).map((item: any, idx: number) => (
        <div
          className="flex w-auto p-4 ml-12"
          style={{
            opacity: item._id ? 1 : 0.5,
            pointerEvents: item._id ? 'initial' : 'none',
          }}
          key={idx}
        >
          {typeof item?.user !== 'string' && (
            <AvatarReplyComment user={item?.user} />
          )}
          <div className="flex flex-col flex-grow ml-4">
            <CommentList
              comment={item}
              user={item?.user}
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
        </div>
      ))}
      <div className="mb-3 ml-10">
        {showReply.length - next > 0 ? (
          <span
            onClick={() => setNext(next + 5)}
            className="cursor-pointer font-semibold text-red-500 hover:underline text-sm"
          >
            See more comments
          </span>
        ) : (
          showReply.length > 1 && (
            <span
              onClick={() => setNext(2)}
              className="cursor-pointer font-semibold text-red-500 hover:underline text-sm"
            >
              See less comments
            </span>
          )
        )}
      </div>
    </div>
  )
}

export default Comments
