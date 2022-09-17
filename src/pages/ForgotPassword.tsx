import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { forgotPassword } from '../redux/actions/authAction'
import { FormSubmit, useTypedDispatch } from '../utils/Typescript'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const dispatch = useTypedDispatch()
  const onHandleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }
  return (
    <div className="w-full ">
      <div className="flex justify-center  mx-auto max-w-screen-xl px-4 mt-10">
        <div className="w-[400px] border-gray-200 border rounded p-4">
          <h3 className="text-center text-2xl font-semibold my-3">
            Forgot Password
          </h3>
          <form onSubmit={onHandleSubmit}>
            <TextField
              required
              value={email}
              type="email"
              name="email"
              label="Email"
              defaultValue="info@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginLeft: '16px' }}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
