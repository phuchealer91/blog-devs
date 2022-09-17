import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OtherInfo from '../../components/profile/OtherInfo'
import UserBlogs from '../../components/profile/UserBlogs'
import UserInfo from '../../components/profile/UserInfo'
import { ReduxState } from '../../utils/Typescript'

const ProfileUser = () => {
  const { auth } = useSelector((state: ReduxState) => state)
  const { userId } = useParams()
  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      <div className="flex w-full">
        <div className="w-2/5 mr-3">
          {auth.user?._id === userId ? <UserInfo /> : <OtherInfo id={userId} />}
        </div>
        <div className="w-3/5 ml-3">
          <UserBlogs />
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
