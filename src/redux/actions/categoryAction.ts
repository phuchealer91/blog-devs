import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { ALERT, IAlertType } from '../types/alertType'
import { IAuth } from '../types/authType'
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  ICategoryType,
  UPDATE_CATEGORY,
} from '../types/categoryType'
import { deleteAPI, getAPI, patchAPI, postAPI } from './../../utils/FetchData'
export const createCategory =
  (name: string, auth: IAuth) =>
  async (dispatch: Dispatch<ICategoryType | IAlertType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const categoryRes = await postAPI('category', { name }, access_token)
      console.log('categoryRes', categoryRes)
      dispatch({
        type: CREATE_CATEGORY,
        payload: categoryRes.data.category,
      })
      dispatch({
        type: ALERT,
        payload: { loading: false, success: categoryRes.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const getCategory =
  () => async (dispatch: Dispatch<ICategoryType | IAlertType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const categoryRes = await getAPI('category')
      dispatch({
        type: GET_CATEGORY,
        payload: categoryRes.data.categories,
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
export const updateCategory =
  (name: string, slug: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const categoryUpdatedRes = await patchAPI(
        `category/${slug}`,
        { name },
        access_token
      )
      dispatch({
        type: UPDATE_CATEGORY,
        payload: categoryUpdatedRes.data.categoryUpdate,
      })
      dispatch({
        type: ALERT,
        payload: { loading: false, success: categoryUpdatedRes.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const deleteCategory =
  (slug: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const categoryDeletedRes = await deleteAPI(
        `category/${slug}`,
        access_token
      )
      dispatch({
        type: DELETE_CATEGORY,
        payload: categoryDeletedRes.data.categoryDeleted,
      })
      dispatch({
        type: ALERT,
        payload: { loading: false, success: categoryDeletedRes.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
