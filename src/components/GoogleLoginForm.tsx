import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
// @ts-ignore
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login'
import { useTypedDispatch } from '../utils/Typescript'
import { facebookLogin, googleLogin } from '../redux/actions/authAction'

const GoogleLoginForm = () => {
  const dispatch = useTypedDispatch()
  const onSuccessFacebook = (res: ReactFacebookLoginInfo) => {
    console.log('resresres', res)
    const { accessToken, userID } = res
    dispatch(facebookLogin(accessToken, userID))
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="mb-4">
        <FacebookLogin
          appId="1235384013915902"
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={onSuccessFacebook}
        />
      </div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log('Login success', credentialResponse.credential)
          dispatch(googleLogin(credentialResponse.credential))
        }}
        onError={() => {
          console.log('Login Failed')
        }}
        theme="outline"
        size="large"
        type="standard"
        context="signin"
        text="signin_with"
        width="100%"
      />
    </div>
  )
}

export default GoogleLoginForm
