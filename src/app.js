const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and templates locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup Directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index', {
        title: 'weather app',
        name: 'annas salman'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Annas'
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        message: 'no help for you',
        title: 'Help',
        name: 'Annas Salman'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'address required'});
    }
    else {
        const address = req.query.address;
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'Forecast Connection Error'
                    });
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: address
                });
            })
        })
    }
});

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorText: 'help article not found',
        name: 'Annas'
    });
});

app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorText: 'error 404',
        name: 'Annas'
    });
});

app.listen(port, ()=>{
    console.log('Server listening on port '+port);
});

