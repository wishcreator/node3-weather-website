const path = require('path');

const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const express = require('express');
const hbs = require('hbs');

const app = express();

//Define Path for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

//Setup HBS engine and views config 
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Alex'
    });
})

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Hello my self'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.search) {
       return res.send({
            error : 'Query not found'
        });
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({
                 error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error) {
                return res.send({
                     error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.search
            });

        })

    })

  
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 404,
        name: 'Alex'
    });
})

app.get('*', (req, res) => {
    res.send('404 page not found');
});



app.listen(3000, () => {
    console.log('Start');
});