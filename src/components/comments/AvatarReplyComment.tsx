import React from 'react'
import { IUser } from '../../utils/Typescript'
interface IProps {
  user: IUser
}
const AvatarComment: React.FC<IProps> = ({ user }) => {
  return (
    <span>
      <img
        src={user.avatar}
        alt=""
        className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full "
      />
    </span>
  )
}

export default AvatarComment
