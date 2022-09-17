import { IGetHomeBlogsType, GET_HOME_BLOGS } from '../types/blogType'
import { IHomeBlogs } from '../types/blogType'
const homeBlogsReducer = (
  state: IHomeBlogs[] = [],
  action: IGetHomeBlogsType
): IHomeBlogs[] => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return action.payload
    default:
      return state
  }
}

export default homeBlogsReducer
