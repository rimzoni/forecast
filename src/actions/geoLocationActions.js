import CONSTS from '../constants'
import { fetchDispatch } from '../actions/fetchUtils'

const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.REQUEST_CURRENT_LOCATION,
    receive: CONSTS.ACTIONS.RECEIVE_CURRENT_LOCATION
  }
}

function getCoordinates (coords) {
  return (dispatch, getState) => {
    apiProps.params = {
      latlng: `${coords.latitude},${coords.longitude}`,
      key: CONSTS.GEO_API_KEY
    }
    apiProps.url = CONSTS.GEO_LOCATION
    return dispatch(fetchDispatch(apiProps))
  }
}

export default { getCoordinates }
