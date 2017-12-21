import { ACTIONS } from '../constants'

function handleLocationActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_CURRENT_LOCATION:
      return { isFetching: true }
    case ACTIONS.RECEIVE_CURRENT_LOCATION:
      const allData = action.response.data
      let results = allData.results[3]
      let city = results.address_components[1].long_name
      let lat = results.geometry.location.lat
      let lng = results.geometry.location.lng
      return {
        isFetching: false,
        allData: allData,
        city: city,
        latitude: lat,
        longitude: lng
      }
    default:
      return state
  }
}

function locationReducer (state = {}, action) {
  return Object.assign({}, state, handleLocationActions(state, action))
}

export default locationReducer
