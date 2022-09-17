import { useSelector } from 'react-redux'
import { ReduxState } from '../../utils/Typescript'
import Loading from './Loading'
import Toaster from './Toaster'

export const Alert = () => {
  const { alert } = useSelector((state: ReduxState) => state)
  return (
    <>
      {alert.loading && <Loading />}
      {alert.success && <Toaster body={alert.success} status="success" />}
      {alert.errors && <Toaster body={alert.errors} status="error" />}
    </>
  )
}
