import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Header from './components/common/Header'
import { Alert } from './components/alert/Alert'
import ActiveAccount from './pages/ActiveAccount'
import ProfileUser from './pages/profile/ProfileUser'
import { useTypedDispatch } from './utils/Typescript'
import { refreshTokens } from './redux/actions/authAction'
import Category from './pages/admin/category'
import { getCategory } from './redux/actions/categoryAction'
import CreateBlog from './pages/blog/CreateBlog'
import { getHomeBlogs } from './redux/actions/blogAction'
import BlogsByCategory from './pages/blog/BlogsByCategory'
import BlogDetail from './pages/blog/BlogDetail'
import UpdateBlog from './pages/blog/UpdateBlog'
import StyleGuide from './pages/StyleGuide'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  const dispatch = useTypedDispatch()
  useEffect(() => {
    dispatch(getHomeBlogs())
    dispatch(refreshTokens())
    dispatch(getCategory())
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Alert />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="styleguide" element={<StyleGuide />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset_password/:tokenId" element={<ResetPassword />} />
          <Route path="active/:slug" element={<ActiveAccount />} />
          <Route path="profile/:userId" element={<ProfileUser />} />
          <Route path="category" element={<Category />} />
          <Route path="blog" element={<CreateBlog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="update-blog/:id" element={<UpdateBlog />} />
          <Route path="blogs/:slug" element={<BlogsByCategory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
