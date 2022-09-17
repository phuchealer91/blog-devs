import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_REPLY_COMMENT,
  GET_COMMENTS,
  ICommentsType,
  ICreateCommentType,
  IDeleteCommentType,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY_COMMENT,
} from './../types/commentType'
import { postAPI, getAPI, patchAPI, deleteAPI } from './../../utils/FetchData'
import { Dispatch } from 'redux'
import { IComment } from '../../utils/Typescript'
import { ALERT, IAlertType } from '../types/alertType'
import { IAuth } from '../types/authType'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const createComment =
  (data: IComment, auth: IAuth) =>
  async (dispatch: Dispatch<ICreateCommentType | IAlertType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })

      const commentRes = await postAPI('comment', data, access_token)
      dispatch({
        type: CREATE_COMMENT,
        payload: { ...commentRes.data.comment, user: data.user },
      })
      dispatch({
        type: ALERT,
        payload: { loading: false },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }

export const getComments =
  (id: string, num: number) =>
  async (dispatch: Dispatch<ICommentsType | IAlertType>) => {
    try {
      const limit = 4

      const dataRes = await getAPI(
        `comment/blog/${id}?page=${num}&limit=${limit}`
      )
      dispatch({
        type: GET_COMMENTS,
        payload: { data: dataRes.data.comments, total: dataRes.data.total },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<ICommentsType | IAlertType>) => {
    const result = await checkTokenExp(token as string, dispatch)
    const access_token = result ? result : token
    try {
      const dataRes = await postAPI(`reply_comment`, data, access_token)
      console.log('dataRes', dataRes)
      dispatch({
        type: REPLY_COMMENT,
        payload: {
          ...dataRes.data.replyComment,
          user: data.user,
          reply_user: data.reply_user,
        },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<ICommentsType | IAlertType>) => {
    const result = await checkTokenExp(token as string, dispatch)
    const access_token = result ? result : token
    try {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY_COMMENT : UPDATE_COMMENT,
        payload: data,
      })
      await patchAPI(
        `comment/${data?._id}`,
        { content: data.content },
        access_token
      )
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IDeleteCommentType | IAlertType>) => {
    const result = await checkTokenExp(token as string, dispatch)
    const access_token = result ? result : token
    try {
      console.log('data', data)
      dispatch({
        type: data.comment_root ? DELETE_REPLY_COMMENT : DELETE_COMMENT,
        payload: data,
      })
      await deleteAPI(`comment/${data?._id}`, access_token)
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
