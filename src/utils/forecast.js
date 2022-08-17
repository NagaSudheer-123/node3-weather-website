const request=require('request')


const forecast=(lat,long,callback)=>{

    //const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(lat)+' '+encodeURIComponent(long)+'.json?access_token=pk.eyJ1IjoibmFnYXN1ZGhlZXItMTIzIiwiYSI6ImNsNm40MGlpYzA1MmQzcXFqZzZ1cWxjZ3oifQ.P9-UFUh0Z7R1PwkO7VGvkQ'
    //console.log(lat,long)
    
    const url='http://api.weatherstack.com/current?access_key=6f63865f443bdc9c67bba61d6a7b47d0&query='+lat+','+long+'&units=f'

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0])
        }

    })
}


module.exports=forecast