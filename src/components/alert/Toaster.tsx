import React from 'react'
import { ALERT } from '../../redux/types/alertType'
import { useTypedDispatch } from '../../utils/Typescript'
interface IToaster {
  // title: string
  body: string | string[]
  status: string | undefined
}
const Toaster = ({ body, status }: IToaster) => {
  const dispatch = useTypedDispatch()
  // useEffect(() => {
  //   setInterval(() => {
  //     dispatch({
  //       type: ALERT,
  //       payload: {},
  //     })
  //   }, 4000)
  // }, [])
  const onHandleClose = () => {
    dispatch({
      type: ALERT,
      payload: {},
    })
  }
  return (
    <>
      {status === 'success' ? (
        <div className="z-[123456789] fixed right-6 top-20 flex items-center bg-green-500 border-l-4 border-green-700 py-3 px-3 shadow-md mb-2">
          <div className="text-green-500 rounded-full bg-white mr-3">
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              className="bi bi-check"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          </div>
          <div className="text-white max-w-xs ">
            {typeof body === 'string' ? (
              body
            ) : (
              <ul>
                {body.map((item: any, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div
            onClick={onHandleClose}
            className="right-[-2px] top-[-16px] relative text-2xl text-white ml-4 cursor-pointer"
          >
            &times;{' '}
          </div>
        </div>
      ) : (
        <div className="z-[123456789] fixed  right-6 top-20 flex items-center bg-red-500 border-l-4 border-red-700 py-3 px-3 shadow-md mb-2">
          <div className="text-red-500 rounded-full bg-white mr-3">
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              className="bi bi-x"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </div>
          <div className="text-white max-w-xs ">
            {' '}
            {typeof body === 'string' ? (
              body
            ) : (
              <ul>
                {body.map((item: any, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div
            onClick={onHandleClose}
            className="right-[-2px] top-[-16px] relative text-2xl text-white ml-4 cursor-pointer"
          >
            &times;{' '}
          </div>
        </div>
      )}
    </>
  )
}

export default Toaster
