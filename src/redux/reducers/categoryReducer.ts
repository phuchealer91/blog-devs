import {
  ICategoryType,
  CREATE_CATEGORY,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from './../types/categoryType'
import { ICategory } from './../../utils/Typescript'
const categoryReducer = (
  state: ICategory[] = [],
  action: ICategoryType
): ICategory[] => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return [action.payload, ...state]
    case UPDATE_CATEGORY:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, name: action.payload.name, slug: action.payload.slug }
          : item
      )
    case DELETE_CATEGORY:
      return state.filter((item) => item._id !== action.payload._id)
    case GET_CATEGORY:
      return action.payload
    default:
      return state
  }
}

export default categoryReducer
