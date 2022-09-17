import axios from 'axios'
import { BASE_URL } from './config'
axios.defaults.withCredentials = true

export const postAPI = async (url: string, data: object, token?: any) => {
  const res = await axios.post(`${BASE_URL}/api/${url}`, data, {
    headers: { Authorization: token },
  })
  return res
}
export const patchAPI = async (url: string, data: object, token?: any) => {
  const res = await axios.patch(`${BASE_URL}/api/${url}`, data, {
    headers: { Authorization: token },
  })
  return res
}
export const putAPI = async (url: string, data: object, token?: any) => {
  const res = await axios.put(`${BASE_URL}/api/${url}`, data, {
    headers: { Authorization: token },
  })
  return res
}
export const getAPI = async (url: string, token?: any) => {
  const res = await axios.get(`${BASE_URL}/api/${url}`, {
    withCredentials: true,
    headers: {
      Authorization: token,
    },
  })
  return res
}
export const deleteAPI = async (url: string, token?: any) => {
  const res = await axios.delete(`${BASE_URL}/api/${url}`, {
    headers: { Authorization: token },
  })
  return res
}
