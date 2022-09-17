import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { FormSubmit, InputChange, useTypedDispatch } from '../utils/Typescript'
interface IProps {
  search: string
}
const LoginForm: React.FC<IProps> = ({ search }) => {
  const initalState = { account: '', password: '' }
  const [userLogin, setUserLogin] = useState(initalState)
  const { account, password } = userLogin
  const dispatch = useTypedDispatch()
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setUserLogin({ ...userLogin, [name]: value })
  }
  const handleSubmitForm = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(login(userLogin))
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="my-3">
        <label htmlFor="email">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="account"
          placeholder="Email"
          value={account}
          onChange={handleChangeInput}
          className="mt-1 px-4 py-2 rounded border w-full"
        />
      </div>
      <div className="my-3">
        <label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChangeInput}
          className="mt-1 px-4 py-2 rounded border w-full"
        />
      </div>
      <div className="my-3">
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 w-full"
          disabled={!account || !password ? true : false}
        >
          Login
        </button>
      </div>
      <NavLink
        to="/forgot-password"
        className="text-blue-500 hover:text-blue-600 underline"
      >
        Forgot password?
      </NavLink>
      <div className="flex items-center mt-2">
        <div>You don't have an account?</div>
        <NavLink
          to={`/register${search}`}
          className="ml-2 text-red-500 hover:text-red-600 underline"
        >
          Register now
        </NavLink>
      </div>
    </form>
  )
}

export default LoginForm
