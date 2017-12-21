import CONSTS from '../constants'
import { fetchDispatch } from '../actions/fetchUtils'

const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.REQUEST_WEATHER_FORECAST,
    receive: CONSTS.ACTIONS.RECEIVE_WEATHER_FORECAST
  }
}

function getForecast (city, unit) {
  return (dispatch, getState) => {
    apiProps.params = {
      q: city,
      cnt: CONSTS.NUMBER_OF_DAYS,
      units: unit ? CONSTS.WEATHER_UNITS.C : CONSTS.WEATHER_UNITS.F,
      appid: CONSTS.OPENWEATHERMAP_API_KEY
    }
    apiProps.types.receive = unit ? CONSTS.ACTIONS.RECEIVE_WEATHER_FORECAST_C : CONSTS.ACTIONS.RECEIVE_WEATHER_FORECAST_F
    apiProps.url = CONSTS.OPENWEATHERMAP_URL
    return dispatch(fetchDispatch(apiProps))
  }
}

function changeScaleType (current, scaleTempChecked) {
  let data = { current: current, scaleTempChecked: scaleTempChecked }
  return {
    type: CONSTS.ACTIONS.CHANGE_SCALE_TYPE,
    data
  }
}

export default { getForecast, changeScaleType }
