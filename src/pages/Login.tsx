import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import GoogleLoginForm from '../components/GoogleLoginForm'
import LoginForm from '../components/LoginForm'
import { ReduxState } from '../utils/Typescript'
const Login = () => {
  const { auth } = useSelector((state: ReduxState) => state)
  const navigate = useNavigate()
  const { search } = useLocation()
  console.log('search', search)
  useEffect(() => {
    if (auth.token) {
      navigate(`/${search.replace('?', '')}`)
    }
  }, [auth.token, navigate])
  return (
    <div className="w-full ">
      <div className="flex justify-center  mx-auto max-w-screen-xl px-4 mt-10">
        <div className="w-[400px] border-gray-200 border rounded p-4">
          <h3 className="text-center text-2xl font-semibold my-3">Login</h3>

          <GoogleLoginForm />
          <LoginForm search={search} />
        </div>
      </div>
    </div>
  )
}

export default Login
