const request = require('request')

const requestPromise = option => new Promise((resolve, reject) => 
    request(option, (error, respone, body) => {
        (respone.statusCode == 200) && resolve(body)
    })
)