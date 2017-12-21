import { ACTIONS, SCALE_TYPE } from '../constants'
import { convertCtoF, convertFtoC, roundNumber } from '../utils/helper'

function prepareReceivedData (data, c) {
  return data.list.map((day) => {
    let celsiusTemp = {
      day: roundNumber(day.temp.day),
      min: roundNumber(day.temp.min),
      max: roundNumber(day.temp.max),
      night: roundNumber(day.temp.night),
      eve: roundNumber(day.temp.eve),
      morn: roundNumber(day.temp.morn)
    }
    let fahrenheitTemp = {
      day: c ? convertCtoF(celsiusTemp.day) : convertFtoC(celsiusTemp.day),
      min: c ? convertCtoF(celsiusTemp.min) : convertFtoC(celsiusTemp.min),
      max: c ? convertCtoF(celsiusTemp.max) : convertFtoC(celsiusTemp.max),
      night: c ? convertCtoF(celsiusTemp.night) : convertFtoC(celsiusTemp.night),
      eve: c ? convertCtoF(celsiusTemp.eve) : convertFtoC(celsiusTemp.eve),
      morn: c ? convertCtoF(celsiusTemp.morn) : convertFtoC(celsiusTemp.morn)
    }
    return {
      temp: celsiusTemp,
      pressure: day.pressure,
      humidity: day.humidity,
      weather: day.weather[0],
      convertedTemp: fahrenheitTemp
    }
  })
}
function changeScaleType (data) {
  return data.map((day) => {
    let prev = day.temp
    let next = day.convertedTemp
    return {
      temp: next,
      pressure: day.pressure,
      humidity: day.humidity,
      weather: day.weather,
      convertedTemp: prev
    }
  })
}
function handleWeatherActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_WEATHER_FORECAST:
      return { isFetching: true }
    case ACTIONS.RECEIVE_WEATHER_FORECAST_C:
      const allData = action.response.data
      let forecastByDay = prepareReceivedData(allData, true)
      let forecast = {
        isFetching: false,
        allData: allData,
        data: forecastByDay,
        scaleType: { celsius: true, icon: SCALE_TYPE.celsius.icon, hex: SCALE_TYPE.celsius.hex }
      }
      localStorage.setItem('forecast', JSON.stringify(forecast))
      return forecast
    case ACTIONS.RECEIVE_WEATHER_FORECAST_F:
      const allDataF = action.response.data
      let forecastByDayF = prepareReceivedData(allDataF, false)
      let forecastF = {
        isFetching: false,
        allData: allDataF,
        data: forecastByDayF,
        scaleType: { celsius: false, icon: SCALE_TYPE.fahrenheit.icon, hex: SCALE_TYPE.fahrenheit.hex }
      }
      localStorage.setItem('forecast', JSON.stringify(forecastF))
      return forecastF
    case ACTIONS.CHANGE_SCALE_TYPE:
      let data = action.data
      let icon = !data.scaleTempChecked ? SCALE_TYPE.celsius.icon : SCALE_TYPE.fahrenheit.icon
      let hex = !data.scaleTempChecked ? SCALE_TYPE.celsius.hex : SCALE_TYPE.fahrenheit.hex
      const persistedForecast = JSON.parse(localStorage.getItem('forecast'))
      persistedForecast.data = changeScaleType(data.current)
      persistedForecast.scaleType = { celsius: !data.scaleTempChecked, icon: icon, hex: hex }
      localStorage.removeItem('forecast')
      localStorage.setItem('forecast', JSON.stringify(persistedForecast))
      return {
        data: changeScaleType(data.current),
        scaleType: { celsius: !data.scaleTempChecked, icon: icon, hex: hex }
      }
    default:
      return state
  }
}

function weatherReducer (state = {}, action) {
  return Object.assign({}, state, handleWeatherActions(state, action))
}

export default weatherReducer
