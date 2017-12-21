import CONSTS from '../constants'
import { combineReducers } from 'redux'
import location from './locationReducer'
import forecast from './weatherReducer'

// Updates error message to notify about the failed fetches.
function errorMessage (state = {}, action) {
  const { type, error } = action

  if (type === CONSTS.ACTIONS.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.errorMessage
  }

  return state
}

const rootReducer = combineReducers({
  location,
  forecast,
  errorMessage
})

export default rootReducer
