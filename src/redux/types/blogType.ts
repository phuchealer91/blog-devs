import { IBlogs } from '../../utils/Typescript'

export const GET_HOME_BLOGS = 'GET_HOME_BLOGS'
export const GET_BLOGS_CATEGORY = 'GET_BLOGS_CATEGORY'
export const GET_BLOGS_USER = 'GET_BLOGS_USER'
export const CREATE_BLOGS_USER = 'CREATE_BLOGS_USER'
export const DELETE_BLOGS_USER = 'DELETE_BLOGS_USER'

export interface IHomeBlogs {
  _id: string
  name: string
  count: number
  blogs: IBlogs[]
}
export interface IGetHomeBlogsType {
  type: typeof GET_HOME_BLOGS
  payload: IHomeBlogs[]
}
export interface IBlogsCategory {
  id: string
  blogs: IBlogs[]
  total: number
  search: string
}
export interface IGetBlogsCategoryType {
  type: typeof GET_BLOGS_CATEGORY
  payload: IBlogsCategory
}
export interface IBlogsUser {
  id: string
  blogs: IBlogs[]
  total: number
  search: string
}
export interface IGetBlogsUserType {
  type: typeof GET_BLOGS_USER
  payload: IBlogsUser
}
export interface ICreateBlogsUserType {
  type: typeof CREATE_BLOGS_USER
  payload: IBlogs
}
export interface IDeleteBlogsUserType {
  type: typeof DELETE_BLOGS_USER
  payload: IBlogs
}

export type IBlogUserTypes =
  | IGetBlogsUserType
  | ICreateBlogsUserType
  | IDeleteBlogsUserType
