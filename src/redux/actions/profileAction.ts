import { patchAPI, getAPI } from './../../utils/FetchData'
import { checkPassword } from './../../utils/Vailidation'
import { Dispatch } from 'redux'
import { imageUpload } from './../../utils/ImageUpload'
import { checkImage } from '../../utils/ImageUpload'
import { ALERT, IAlertType } from '../types/alertType'
import { AUTH, IAuth } from './../types/authType'
import { GET_USER_PROFILE, IUserProfileType } from '../types/userType'
import { checkTokenExp } from '../../utils/checkTokenExp'
export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<any | IAlertType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    if (!auth.token || !auth.user) return
    let url = ''
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })

      if (avatar) {
        const check = checkImage(avatar)
        if (check)
          dispatch({
            type: ALERT,
            payload: { errors: check },
          })
        const photo = await imageUpload(avatar)
        url = photo?.url
      }

      dispatch({
        type: AUTH,
        payload: {
          token: access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      })
      const dataRes = await patchAPI(
        'user',
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        access_token
      )
      dispatch({
        type: ALERT,
        payload: { loading: false, success: dataRes.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }

export const resetPassword =
  (password: string, cf_password: string, token: string | undefined) =>
  async (dispatch: any) => {
    const result = await checkTokenExp(token as string, dispatch)
    const access_token = result ? result : token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const msg = checkPassword(password, cf_password)
      if (msg) {
        dispatch({
          type: ALERT,
          payload: { loading: false, errors: msg },
        })
      }
      const dataRes = await patchAPI(
        'reset_password',
        { password },
        access_token
      )
      dispatch({
        type: ALERT,
        payload: { loading: false, success: dataRes.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const getUserDetail =
  (id: string) => async (dispatch: Dispatch<IUserProfileType | IAlertType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })

      const dataRes = await getAPI(`user/${id}`)
      dispatch({
        type: GET_USER_PROFILE,
        payload: dataRes.data.user,
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
