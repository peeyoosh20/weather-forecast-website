const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 
const app = express()
//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlers engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'peeyoosh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'peeyoosh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is help page',
        title:'Help',
        name:'peeyoosh'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Address must be provided!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                'error':error
            })  
        }
        
        forecast(longitude, latitude, (error, foreCastdata) => {
            if(error)
        {
            return res.send({
                'error':error
            })  
        }
        res.send({
            forecast:foreCastdata,
            location:location,
            address:req.query.address
        })
            
        })
       
    })
  
})
app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:'Please provide search query'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
 })

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title:'helpError',
        message:'Help artical not found',
        name:'peeyoosh'
    })
 })

 
app.get('*',(req,res)=>{
   res.render('error404',{
       title:'genericError',
       message:'Page not found',
       name:'peeyoosh'
   })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
