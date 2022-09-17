import React from 'react'
import { useLocation } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  const { search } = useLocation()
  return (
    <div className="w-full ">
      <div className="flex justify-center  mx-auto max-w-screen-xl px-4 mt-10">
        <RegisterForm search={search} />
      </div>
    </div>
  )
}

export default Register
