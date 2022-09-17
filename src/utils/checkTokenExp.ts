import { getAPI } from './FetchData'
import jwt_decode from 'jwt-decode'
import { AUTH } from '../redux/types/authType'
interface IToken {
  exp: number
  iat: number
  id: string
}
export const checkTokenExp = async (token: string, dispatch: any) => {
  const decode: IToken = jwt_decode(token)
  if (decode.exp >= Date.now() / 1000) return
  const res = await getAPI('refresh_token')
  if (res.data)
    dispatch({
      type: AUTH,
      payload: res.data,
    })
  return res.data.access_token
}
