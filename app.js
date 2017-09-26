const yargs = require('yargs')
const { geocodeAddress } = require('./geocode')
const { getWeather } = require('./weather')

const addressOption = {
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true,
    },
}
const argv = yargs
    .options(addressOption)
    .help()
    .alias('help', 'h').argv

geocodeAddress(argv.address)
    .then(getWeather)
    .then(console.log)
    .catch(console.error)
