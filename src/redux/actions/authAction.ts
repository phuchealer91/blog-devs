import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { ValidRegister } from '../../utils/Vailidation'
import { ALERT } from '../types/alertType'
import { getAPI, postAPI } from './../../utils/FetchData'
import { IUserLogin, IUserRegister } from './../../utils/Typescript'
import { IAlertType } from './../types/alertType'
import { AUTH, IAuthType } from './../types/authType'
export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await postAPI('login', userLogin)
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      })
      dispatch({
        type: ALERT,
        payload: { success: 'Login successfully !' },
      })
      localStorage.setItem('logged', 'blog-dev')
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const checkValid = ValidRegister(userRegister)
    if (checkValid.errLength > 0) {
      return dispatch({
        type: ALERT,
        payload: { loading: false, errors: checkValid.errMsg },
      })
    }
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await postAPI('register', userRegister)
      console.log('resresres', res)
      // dispatch({
      //   type: AUTH,
      //   payload: {
      //     token: res.data.access_token,
      //     user: res.data.user,
      //   },
      // })
      dispatch({
        type: ALERT,
        payload: { success: 'Register successfully !' },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
export const refreshTokens =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')
    if (logged !== 'blog-dev') return
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await getAPI('refresh_token')
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      })
      dispatch({
        type: ALERT,
        payload: {},
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
export const logOut =
  (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token as string, dispatch)
    const access_token = result ? result : token
    try {
      localStorage.removeItem('logged')
      await getAPI('logout', access_token)
      dispatch({
        type: AUTH,
        payload: {},
      })
      window.location.href = '/'
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
export const googleLogin =
  (id_token: string | undefined) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      if (id_token) {
        dispatch({
          type: ALERT,
          payload: { loading: true },
        })
        const res = await postAPI('google_login', { id_token })
        console.log('res', res)
        dispatch({
          type: AUTH,
          payload: {
            token: res.data.access_token,
            user: res.data.user,
          },
        })
        dispatch({
          type: ALERT,
          payload: { success: 'Login successfully !' },
        })
        localStorage.setItem('logged', 'blog-dev')
      }
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
export const facebookLogin =
  (accessToken: string, userID: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await postAPI('facebook_login', { accessToken, userID })
      console.log('res', res)
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      })
      dispatch({
        type: ALERT,
        payload: { success: 'Login successfully !' },
      })
      localStorage.setItem('logged', 'blog-dev')
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const res = await postAPI('forgot_password', { email })

      dispatch({
        type: ALERT,
        payload: { success: res.data.msg, loading: false },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { loading: false, errors: error.response.data.msg },
      })
    }
  }
