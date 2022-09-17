import { IComment } from './../../utils/Typescript'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const REPLY_COMMENT = 'REPLY_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_REPLY_COMMENT = 'UPDATE_REPLY_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_REPLY_COMMENT = 'DELETE_REPLY_COMMENT'

export interface ICommentSate {
  data: IComment[]
  total: number
}
export interface ICreateCommentType {
  type: typeof CREATE_COMMENT
  payload: IComment
}
export interface IGetCommentsType {
  type: typeof GET_COMMENTS
  payload: ICommentSate
}
export interface IReplyCommentType {
  type: typeof REPLY_COMMENT
  payload: IComment
}
export interface IUpdateCommentType {
  type: typeof UPDATE_COMMENT
  payload: IComment
}
export interface IUpdateReplyCommentType {
  type: typeof UPDATE_REPLY_COMMENT
  payload: IComment
}
export interface IDeleteCommentType {
  type: typeof DELETE_COMMENT | typeof DELETE_REPLY_COMMENT
  payload: IComment
}
export type ICommentsType =
  | ICreateCommentType
  | IGetCommentsType
  | IReplyCommentType
  | IUpdateCommentType
  | IUpdateReplyCommentType
  | IDeleteCommentType
