import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import { FormSubmit, InputChange, useTypedDispatch } from '../utils/Typescript'
interface IProps {
  search: string
}
const RegisterForm: React.FC<IProps> = ({ search }) => {
  const initalState = { name: '', account: '', password: '', cf_password: '' }
  const [userRegister, setUserRegister] = useState(initalState)
  const { name, account, password, cf_password } = userRegister
  const dispatch = useTypedDispatch()
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target
    setUserRegister({ ...userRegister, [name]: value })
  }
  const handleSubmitForm = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(register(userRegister))
  }
  return (
    <form
      onSubmit={handleSubmitForm}
      className="w-[400px] border-gray-200 border rounded p-4"
    >
      <h3 className="text-center text-2xl font-semibold my-3">Register</h3>
      <div className="my-3">
        <label htmlFor="email">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChangeInput}
          className="mt-1 px-4 py-2 rounded border w-full"
        />
      </div>
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
        <label htmlFor="password">
          Confirm password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="cf_password"
          placeholder="Confirm password"
          value={cf_password}
          onChange={handleChangeInput}
          className="mt-1 px-4 py-2 rounded border w-full"
        />
      </div>
      <div className="my-3">
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 w-full"
          // disabled={!name || !account || !password ? true : false}
        >
          Register
        </button>
      </div>

      <div className="flex items-center mt-2">
        <div>Do you already have an account?</div>
        <NavLink
          to={`/login${search}`}
          className="ml-2 text-red-500 hover:text-red-600 underline"
        >
          Login
        </NavLink>
      </div>
    </form>
  )
}

export default RegisterForm
