const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const request=require('request')


const app=express()

const port=process.env.PORT || 3000

const publicDirPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')



app.set('views',viewspath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        type:"Vegtables",
        name:"Sudheer"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:"Sekhar"

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:"Bobby"
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Please, provide address'
        })
    }


    console.log(req.query.address)
geocode(req.query.address,(error,data)=>{

    if(error){
      return res.send(error)
    }
  
     forecast( data.longitude,data.latitude, (error, forecastData) => {
      if(error){
        return res.send(error)
      }
  
    //   console.log(data.location)
    //   console.log(forecastData)

      res.send({
        location:data.location,
        forecastData:forecastData,
        address:req.query.address
    })
  
  
    })
  
  })
    // console.log(req.query.address)
  

    // res.send({
    //     forecast:"30 degrees",
    //     location:"Anagra",
    //     address:req.query.address
    // })



})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'Provide search term...'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render("error2")
})

app.get('*',(req,res)=>{
    res.render("error1")
})

app.listen(port,()=>{
    console.log("Server is up on port "+port)
})

