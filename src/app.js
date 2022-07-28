const hbs = require('hbs');
const express = require('express');
const path = require('path');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');
const { headsOrTails } = require('./utils/headsOrTails');

const app = express();
const port = process.env.PORT || 3000;
const publciDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publciDirPath));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'cptShell',
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Page',
        name: 'cptShell',
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help Page',
        name: 'cptShell',
    });
});

app.get('/form', (req, res) => {
    setTimeout(() => {
        const isLuckyDay = headsOrTails();

        if (isLuckyDay) {
            return res.send({
                status: "Success",
                message: "Данный формы приняты успешно",
            });
        }

        return res.send({
            status: "Error",
            message: "Данный формы не приняты",
        });
    }, 2000);
});

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'Location is required',
        });
    }

    geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
    
        forecast(latitude, longtitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }
    
            res.send({
                forecast: data,
                location,
                address,
            });
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: [],
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Page 404',
        description: 'Page article not found',
        name: 'cptShell',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page 404',
        description: 'Page not found',
        name: 'cptShell',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});