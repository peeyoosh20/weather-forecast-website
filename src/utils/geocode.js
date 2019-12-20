const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGVleW9vc2giLCJhIjoiY2s0M3h2NThyMGN1ODNsbGdoaXk2NWNoMyJ9.J_I_eT1w2X4HK94vtBavNQ'
    request({url, json:true},(error,{body}={})=>{
     if(error)
     {
         callback('Unable to connect!',undefined);
     }
     else if(body.features.length===0)
     {
         callback('Unable to find location. Try another search',undefined)
     }
     else
     {
         callback(undefined,{
             longitude:body.features[0].center[0],
             latitude:body.features[0].center[1],
             location:body.features[0].place_name
         })
     }
    })
  }
  module.exports = geocode
  