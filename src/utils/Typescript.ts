import { ChangeEvent, FormEvent } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
/* Instruments */
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import rootReducer from '../redux/reducers/index'
import store from '../redux/store'

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
export type FormSubmit = FormEvent<HTMLFormElement>

export interface IUserLogin {
  account: string
  password: string
}
export interface IUserRegister extends IUserLogin {
  name: string
  cf_password: string
}
export interface IUser extends IUserLogin {
  avatar: string
  name: string
  role: string
  type: string
  createdAt: string
  updatedAt: string
  _id: string
}
export interface IUserInfo extends IUserRegister {
  avatar: string | File
}
// Alert
export interface IAlert {
  loading?: boolean
  success?: string | string[]
  errors?: string | string[]
}
export interface IParams {
  slug: string
}
export interface IfbData {
  accessToken: string
  userID: string
}
export interface ICategory {
  _id: string
  name: string
  createdAt: string
  slug: string
  updatedAt: string
}
export interface IBlogs {
  _id?: string
  title: string
  user: string | IUser
  content: string
  description: string
  thumbnail: string | File
  category: string | any
  createdAt: string
}
export interface IComment {
  _id?: string
  user?: IUser
  blog_id: string
  blog_user_id: string
  content: string
  reply_cmt?: IComment[]
  reply_user?: IUser
  comment_root?: string
  createdAt: string
}
// Check type redux & redux-thunk
/* Types */
export type AppDispatch = typeof store.dispatch
export type ReduxState = ReturnType<typeof rootReducer>
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector
