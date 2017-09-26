const request = require('request-promise')

const urlGeocode = 'https://maps.googleapis.com/maps/api/geocode/json'

const initOption = address => ({
  url: `${urlGeocode}?address=${address}`,
  json: true,
  resolveWithFullResponse: true,
})

const rejectError = () => Promise.reject('Unable to connect to Google servers.')

const rejectInvalidAddress = () =>
  Promise.reject('Unable to find that address.')

const response = ({ status, results }) =>
  (status === 'OK' && parseGeocode(results[0])) || rejectInvalidAddress()

const parseGeocode = ({ formatted_address, geometry }) => ({
  address: formatted_address,
  lat: geometry.location.lat,
  long: geometry.location.lng,
})

const geocodeAddress = address =>
  Promise.resolve(address)
    .then(encodeURIComponent)
    .then(initOption)
    .then(request)
    .catch(rejectError)
    .then(({ body }) => response(body))

module.exports = { geocodeAddress }
