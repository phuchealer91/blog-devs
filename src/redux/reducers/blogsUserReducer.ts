import { IUser } from '../../utils/Typescript'
import {
  IBlogUserTypes,
  CREATE_BLOGS_USER,
  GET_BLOGS_USER,
  IBlogsUser,
  DELETE_BLOGS_USER,
} from './../types/blogType'

const blogsUserReducer = (
  state: IBlogsUser[] = [],
  action: IBlogUserTypes
): IBlogsUser[] => {
  switch (action.type) {
    case CREATE_BLOGS_USER:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? { ...item, blogs: [action.payload, ...item.blogs] }
          : item
      )

    case GET_BLOGS_USER:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload]
      } else {
        return state.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    case DELETE_BLOGS_USER:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: item.blogs.filter(
                (blog) => blog._id !== action.payload._id
              ),
            }
          : item
      )
    default:
      return state
  }
}
export default blogsUserReducer
