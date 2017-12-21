function stringsToObject (actions) {
  return actions
    .trim()
    .split(/\s+/)
    .reduce((obj, action) => {
      obj[action] = action
      return obj
    }, {})
}

export default {
  // Enter your API keys for OpenWeatherMap and Google Geolocation here or in env vars.
  OPENWEATHERMAP_API_KEY: `${process.env.OPENWEATHERMAP_API_KEY}`,
  OPENWEATHERMAP_URL: 'http://api.openweathermap.org/data/2.5/forecast/daily',
  GEO_API_KEY: `${process.env.GEO_API_KEY}`,
  GEO_LOCATION: 'https://maps.googleapis.com/maps/api/geocode/json',
  NUMBER_OF_DAYS: 7,
  WEATHER_UNITS: { C: 'metric', F: 'imperial' },
  SCALE_TYPE: { celsius: {hex: '8451', icon: 'celsius'}, fahrenheit: {hex: '8457', icon: 'fahrenheit'} },
  ACTIONS: stringsToObject(`
    REQUEST_CURRENT_LOCATION
    RECEIVE_CURRENT_LOCATION
    REQUEST_WEATHER_FORECAST
    RECEIVE_WEATHER_FORECAST_C
    RECEIVE_WEATHER_FORECAST_F
    CHANGE_SCALE_TYPE
  `)
}
