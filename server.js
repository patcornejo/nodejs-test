const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);
app.use(express.static(__dirname + '/assets'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to put log');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello World!</h1>');
  res.send({
    name: 'Pat',
    age: 25
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome'
  });
})

// bad response
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Ocurrió un error'
  });
})

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
