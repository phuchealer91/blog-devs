import { IUser } from '../../utils/Typescript'
import { IUserProfileType, GET_USER_PROFILE } from './../types/userType'
const userProfileReducer = (
  state: IUser[] = [],
  action: IUserProfileType
): IUser[] => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return [...state, action.payload]

    default:
      return state
  }
}

export default userProfileReducer
