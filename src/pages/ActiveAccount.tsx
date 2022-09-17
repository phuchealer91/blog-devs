import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { ShowErrorMsg, ShowSuccessMsg } from '../components/alert/Alert'
import { postAPI } from '../utils/FetchData'
export const ShowErrorMsg = (txt: string) => {
  return (
    <div className="flex justify-center">
      <div className="text-white bg-red-600 px-3 py-2 rounded">{txt}</div>
    </div>
  )
}
export const ShowSuccessMsg = (txt: string) => {
  return (
    <div className="flex justify-center">
      <div className="text-white bg-green-600 px-3 py-2 rounded">{txt}</div>
    </div>
  )
}

const ActiveAccount = () => {
  const { slug } = useParams()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  useEffect(() => {
    console.log('hello 2')
    if (slug) {
      postAPI('active', { active_token: slug })
        .then((res) => {
          setSuccess(res.data.msg)
        })
        .catch((error) => {
          setError(error.response.data.msg)
        })
    }
  }, [slug])
  return (
    <div>
      {error && ShowErrorMsg(error)}
      {success && ShowSuccessMsg(success)}
    </div>
  )
}

export default ActiveAccount
