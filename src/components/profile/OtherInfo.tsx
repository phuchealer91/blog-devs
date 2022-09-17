import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserDetail } from '../../redux/actions/profileAction'
import { IUser, ReduxState, useTypedDispatch } from '../../utils/Typescript'
interface IProps {
  id: string | undefined
}
const OtherInfo: React.FC<IProps> = ({ id }) => {
  const dispatch = useTypedDispatch()
  const { userProfile } = useSelector((state: ReduxState) => state)
  const [otherInfo, setOtherInfo] = useState<IUser>()
  // const isMounted = useRef(true)
  useEffect(() => {
    // if (isMounted.current) {
    //   isMounted.current = false
    //   return
    // }
    if (!id) return
    if (userProfile.every((item: any) => item._id !== id)) {
      dispatch(getUserDetail(id))
    } else {
      const userRes = userProfile.find((item) => item._id === id)
      if (userRes) setOtherInfo(userRes)
    }
  }, [id, dispatch, userProfile])
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Info</h3>
      <div className="border rounded-md p-4 flex flex-col items-center">
        <div>
          <img
            src={otherInfo?.avatar}
            alt=""
            className="rounded-full h-32 w-32"
          />
        </div>
        <div className="font-semibold mt-4">{otherInfo?.name}</div>
        <div>{otherInfo?.account}</div>
        {/* <div>{new Date(otherInfo?.createdAt).toLocaleDateString()}</div> */}
      </div>
    </div>
  )
}

export default OtherInfo
