import {
  ICommentSate,
  CREATE_COMMENT,
  GET_COMMENTS,
  ICommentsType,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY_COMMENT,
  DELETE_COMMENT,
  DELETE_REPLY_COMMENT,
} from './../types/commentType'
const initalState = {
  data: [],
  total: 1,
}
const commentReducer = (
  state: ICommentSate = initalState,
  action: ICommentsType
): ICommentSate => {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, data: [action.payload, ...state.data] }
    case GET_COMMENTS:
      return action.payload
    case REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                reply_cmt: [...(item.reply_cmt as []), action.payload],
              }
            : item
        ),
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      }
    case UPDATE_REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                reply_cmt: item.reply_cmt?.map((reply) =>
                  reply._id === action.payload._id ? action.payload : reply
                ),
              }
            : item
        ),
      }
    case DELETE_COMMENT:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload._id),
      }
    case DELETE_REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                reply_cmt: item.reply_cmt?.filter(
                  (reply) => reply._id !== action.payload._id
                ),
              }
            : item
        ),
      }
    default:
      return state
  }
}
export default commentReducer
