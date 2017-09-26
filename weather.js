const request = require('request-promise')

const urlForecast =
  'https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d'

const initOption = ({ lat, long }) => ({
  url: `${urlForecast}/${lat},${long}`,
  json: true,
  resolveWithFullResponse: true,
})

const rejectError = () =>
  Promise.reject('Unable to connect to Forecast.io server.')

const rejectUnfetch = () => Promise.reject('Unable to fetch weather.')

const response = geocode => ({ statusCode, body }) =>
  (statusCode == 200 && parseWeatherInfo(body, geocode)) || rejectUnfetch

const parseWeatherInfo = ({ currently, hourly }, geocode) =>
  Object.assign(geocode, {
    temperature: currently.temperature,
    realFeel: currently.apparentTemperature,
    summary: hourly.summary,
  })

const getWeather = geocode =>
  Promise.resolve(geocode)
    .then(initOption)
    .then(request)
    .catch(rejectError)
    .then(response(geocode))

module.exports = { getWeather }
