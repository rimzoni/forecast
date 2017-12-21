function getWeatherBasedOnTimeOfDay (m, currentDay) {
  if (!m || !m.isValid()) { return }

  var currentHour = parseFloat(m.format('HH'))

  switch (true) {
    case currentHour > 5 && currentHour <= 12 :
      return { period: 'day', value: currentDay.temp.morn }
    case currentHour > 12 && currentHour <= 17 :
      return { period: 'day', value: currentDay.temp.day }
    case currentHour > 17 && currentHour <= 24 :
      return { period: 'night', value: currentDay.temp.eve }
    default:
      return { period: 'night', value: currentDay.temp.night }
  }
}

function toUppercaseFirstLetter (s) {
  return s && s[0].toUpperCase() + s.slice(1)
}

function roundNumber (num) {
  return parseFloat(num.toFixed(1))
}
// T(°F) = T(°C) × 1.8 + 32
function convertCtoF (c) {
  return parseFloat((parseFloat(c) * 1.8 + 32).toFixed(1))
}
// T(°C) = (T(°F) - 32) / 1.8
function convertFtoC (f) {
  return parseFloat(((parseFloat(f) - 32) / 1.8).toFixed(1))
}

export { getWeatherBasedOnTimeOfDay, toUppercaseFirstLetter, convertCtoF, convertFtoC, roundNumber }
