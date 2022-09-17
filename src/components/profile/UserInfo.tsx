import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { resetPassword, updateUser } from '../../redux/actions/profileAction'
import { useTypedDispatch } from '../../utils/Typescript'
import {
  FormSubmit,
  InputChange,
  IUserInfo,
  ReduxState,
} from '../../utils/Typescript'

const UserInfo = () => {
  const initState = {
    name: '',
    account: '',
    avatar: '',
    password: '',
    cf_password: '',
  }
  const { auth } = useSelector((state: ReduxState) => state)
  const [user, setUser] = useState<IUserInfo>(initState)
  const dispatch = useTypedDispatch()
  const { name, account, avatar, password, cf_password } = user
  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const onHandleAvatar = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    console.log('filessss', files)
    if (files) {
      const file = files[0]
      setUser({ ...user, avatar: file })
    }
  }
  const handleSubmitForm = (e: FormSubmit) => {
    e.preventDefault()
    if (avatar || name) {
      dispatch(updateUser(avatar as File, name, auth))
    }
    if (password) {
      dispatch(resetPassword(password, cf_password, auth.token))
    }
  }
  return (
    <div>
      <h3 className="text-lg font-semibold my-4">Profile</h3>
      <div className="border rounded-md">
        <form onSubmit={handleSubmitForm} className="p-4">
          <div className="my-3 flex justify-center items-center flex-col">
            <img
              src={
                avatar ? URL.createObjectURL(avatar as File) : auth.user?.avatar
              }
              alt="avatar"
              className="w-32 h-32 rounded-full"
            />
            <input
              type="file"
              name="file"
              accept="image/*"
              id="file_up"
              onChange={onHandleAvatar}
            />
          </div>
          <div className="my-3">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name ? name : auth.user?.name}
              onChange={handleChangeInput}
              className="mt-1 px-4 py-2 rounded border w-full"
            />
          </div>
          <div className="my-3">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              name="account"
              placeholder="Email"
              value={account ? account : auth.user?.account}
              disabled
              onChange={handleChangeInput}
              className="mt-1 px-4 py-2 rounded border w-full"
            />
          </div>
          <div className="text-red-500 text-xs">
            {auth.user?.type !== 'register' &&
              `Login ${auth.user?.type} cannot update password !`}
          </div>
          <div className="my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              disabled={auth.user?.type !== 'register' ? true : false}
              onChange={handleChangeInput}
              className="mt-1 px-4 py-2 rounded border w-full"
            />
          </div>
          <div className="my-3">
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              name="cf_password"
              placeholder="Confirm password"
              value={cf_password}
              disabled={auth.user?.type !== 'register' ? true : false}
              onChange={handleChangeInput}
              className="mt-1 px-4 py-2 rounded border w-full"
            />
          </div>
          <div className="my-3">
            <button
              type="submit"
              className="bg-green-600 text-white rounded px-4 py-2 w-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserInfo
