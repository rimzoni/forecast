import { ACTIONS } from '../constants'
import geoLocationActions from './geoLocationActions'
import weatherActions from './weatherActions'

function resetErrorMessage () {
  return { type: ACTIONS.RESET_ERROR_MESSAGE }
}

export {
  weatherActions,
  geoLocationActions,
  resetErrorMessage
}
