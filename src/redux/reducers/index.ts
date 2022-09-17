import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import homeBlogsReducer from './homeBlogsReducer'
import blogsCategoryReducer from './blogsCategoryReducer'
import userProfileReducer from './userProfileReducer'
import blogsUserReducer from './blogsUserReducer'
import commentReducer from './commentReducer'
export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  categories: categoryReducer,
  homeBlogs: homeBlogsReducer,
  categoryBlogs: blogsCategoryReducer,
  userProfile: userProfileReducer,
  blogsUser: blogsUserReducer,
  comments: commentReducer,
})
