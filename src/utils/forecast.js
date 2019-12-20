const request = require('request')
const forecast = (longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/b1ec652ff716f062906216462ae8b544/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,{body}={})=>{
        if(error)
        {
            callback('unable to connect to wheather service!',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location!',undefined)
        }
        else
        {
            callback(undefined,
                body.daily.data[0].summary+
                ' Currently '+body.currently.temperature+' degree temperature out.'+
                'There is a '+body.currently.precipProbability+'% chance of rain.'

            )
        }
    })

}
module.exports = forecast
