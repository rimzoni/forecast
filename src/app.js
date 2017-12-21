import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const persistedForecast = JSON.parse(localStorage.getItem('forecast'))
let forecast = {}
if (persistedForecast) {
  forecast = persistedForecast
} else {
  forecast = {
    isFetching: false,
    allData: [],
    data: [
      { temp: [],
        pressure: '',
        humidity: '',
        weather: []
      }
    ],
    scaleType: {
      celsius: true,
      icon: '',
      hex: ''
    }
  }
}
// Define the initial state properties here
const initialAppState = {
  location: {
    isFetching: false,
    allData: [], // stores the unfiltered data
    city: '',
    latitude: '',
    longitude: ''
  },
  forecast: forecast,
  errorMessage: null
}

const store = configureStore(initialAppState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
