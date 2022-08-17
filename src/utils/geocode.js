



const request=require('request')



const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmFnYXN1ZGhlZXItMTIzIiwiYSI6ImNsNm40MGlpYzA1MmQzcXFqZzZ1cWxjZ3oifQ.P9-UFUh0Z7R1PwkO7VGvkQ'

    request({url:url,json:true},(error,response)=>{

        if(error)
        {
            callback('Unable to connect to location servcies',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find location. Try anotehr search',undefined)
        }

        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })

        }

       

    })

}


module.exports=geocode