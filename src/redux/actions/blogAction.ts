import {
  GET_BLOGS_USER,
  IBlogUserTypes,
  IGetBlogsUserType,
  GET_BLOGS_CATEGORY,
  GET_HOME_BLOGS,
  IGetBlogsCategoryType,
  IGetHomeBlogsType,
  CREATE_BLOGS_USER,
  DELETE_BLOGS_USER,
} from './../types/blogType'
import { deleteAPI, getAPI, putAPI } from './../../utils/FetchData'
import { IAuth } from './../types/authType'
import { Dispatch } from 'redux'
import { IBlogs } from './../../utils/Typescript'
import { ALERT, IAlertType } from './../types/alertType'
import { imageUpload } from '../../utils/ImageUpload'
import { postAPI } from '../../utils/FetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const createBlog =
  (blog: IBlogs, auth: IAuth) =>
  async (dispatch: Dispatch<IBlogUserTypes | IAlertType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      let url = ''
      if (typeof blog.thumbnail !== 'string') {
        const photo = await imageUpload(blog.thumbnail)
        url = photo.url
      } else {
        url = blog.thumbnail
      }
      const newBlog = { ...blog, thumbnail: url }
      const newBlogRes = await postAPI('blog', { newBlog }, access_token)
      // Update redux
      dispatch({
        type: CREATE_BLOGS_USER,
        payload: newBlogRes.data,
      })
      dispatch({
        type: ALERT,
        payload: { loading: false, success: newBlogRes.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const getHomeBlogs =
  () => async (dispatch: Dispatch<IGetHomeBlogsType | IAlertType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const homeBlogs = await getAPI('blogs')
      dispatch({
        type: GET_HOME_BLOGS,
        payload: homeBlogs.data.data,
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
export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IGetBlogsCategoryType | IAlertType>) => {
    try {
      let limit = `&limit=${4}`
      const value = search ? search : `?page=1`
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      console.log(search)
      const blogsCategoryRes = await getAPI(`blogs/${id}${value}${limit}`)
      dispatch({
        type: GET_BLOGS_CATEGORY,
        payload: { ...blogsCategoryRes.data, id, search },
      })
      console.log('blogsCategoryRes', blogsCategoryRes)
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
export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IGetBlogsUserType | IAlertType>) => {
    try {
      console.log('id & search', id, search)
      let limit = `&limit=${3}`
      const value = search ? search : `?page=1`
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const blogsUserRes = await getAPI(`blogs/user/${id}${value}${limit}`)
      dispatch({
        type: GET_BLOGS_USER,
        payload: { ...blogsUserRes.data, id, search },
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
export const updateBlog =
  (blog: IBlogs, auth: IAuth) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      let url = ''
      if (typeof blog.thumbnail !== 'string') {
        const photo = await imageUpload(blog.thumbnail)
        url = photo.url
      } else {
        url = blog.thumbnail
      }
      const updateBlog = { ...blog, thumbnail: url }
      const updateBlogs = await putAPI(
        `blog/${updateBlog._id}`,
        { updateBlog },
        access_token
      )
      console.log('updateBlogs', updateBlogs)
      dispatch({
        type: ALERT,
        payload: { loading: false, success: updateBlogs.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
export const deleteBlog =
  (blog: IBlogs, auth: IAuth) =>
  async (dispatch: Dispatch<IBlogUserTypes | IAlertType>) => {
    const result = await checkTokenExp(auth?.token as string, dispatch)
    const access_token = result ? result : auth?.token
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      })
      const deletedBlog = await deleteAPI(`blog/${blog._id}`, access_token)
      dispatch({
        type: DELETE_BLOGS_USER,
        payload: blog,
      })
      dispatch({
        type: ALERT,
        payload: { loading: false, success: deletedBlog.data.msg },
      })
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      })
    }
  }
