import { IUser } from '../../utils/Typescript'

export const AUTH = 'AUTH'

export interface IAuth {
  token?: string
  user?: IUser
}

export interface IAuthType {
  type: typeof AUTH
  payload: IAuth
}
