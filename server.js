const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('sever.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server log');
    }
  });
  next();
});
  //
  // app.use((req, res, next) => {
  //   res.render('maintenance.hbs');
  // });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle: "Home Page",
      welcomeMessage: "Welcome to my first HBS Site."
  });

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Page"
  });
});
app.get('/bad', (req,res) => {
  res.send({
    errorMessage: "Here is my error"
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: "Projects Homepage",
    defualtMessage: "Welcome to the projects page."
  });
});
app.listen(PORT, () => {
  console.log(`Sever is up on ${PORT}`);
});
