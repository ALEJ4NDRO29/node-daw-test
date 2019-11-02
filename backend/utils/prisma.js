const request = require('request')
const constants = require('../config/constants');

async function mutation(mutation) {
    request.post(constants.apiApollo, {
        json: {
            "query": mutation
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
    })
}



module.exports = {
    mutation
}