const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

// const hbs = require('hbs');
const log = console.log;
//Express contains a function instead of the Normal object

const app = express();
const port = process.env.PORT;
//Define path for Express config
const publicDirectoryPathName = path.join(__dirname,'../public');
const changehbsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
//use Express Static to serve Static Files

app.use(express.static(publicDirectoryPathName));

// set up the hbs(handlebars) using express view engine
app.set('views',changehbsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Homepage',
        content:'This is the Homepage',
        name:'Olajide Oladapo Ayomide'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        content:'Hello World This is the About Us Page',
        name:'Created by Olajide Oladapo Ayomide'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        content:'see help desk below',
        line:'Call 09069394998 and tell him Everything you want to know',
        name:'Olajide Oladapo Ayomide'
    })
})

 //Weather Page
    app.get('/weather',(req,res)=>{
        if (!req.query.address){
            return res.send({
                error:'Address Not Specified',
                errorCode:401
            })
        }
        geocode(req.query.address,(error,{long,lat,location} = {})=>{
            if (error) {
                return res.send({error:error,errorCode:401})
            } 
                forecast( {lat,long} ,(err,obj)=>{
                    if (err){
                        return res.send({error:err,errorCode:401})
                    } 
                        res.send({address:obj,location});
                    
                })
                        
        })
        
})



//Error page Help
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        content:'Help Page Not Found'
    });
})

//Error Page

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404 PAGE',
        content:'Page Not Found'
    });
})

//Start Port
app.listen((port || 3000),()=>{
    console.log('The App is Listened on 3000');
})