import {
  IBlogsCategory,
  IGetBlogsCategoryType,
  GET_BLOGS_CATEGORY,
} from './../types/blogType'
const blogsCategoryReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_CATEGORY:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload]
      } else {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      }

    default:
      return state
  }
}

export default blogsCategoryReducer
