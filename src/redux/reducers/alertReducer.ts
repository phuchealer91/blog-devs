import { IAlertType } from './../types/alertType'
import { IAlert } from './../../utils/Typescript'
import { ALERT } from '../types/alertType'

const alertReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
  switch (action.type) {
    case ALERT:
      return action.payload
    default:
      return state
  }
}
export default alertReducer
