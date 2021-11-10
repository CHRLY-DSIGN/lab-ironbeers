const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// ...

app.get("/beers", (req, res, next) => {
  console.log("El cielo está enladrillado");
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render("beers", {beersFromApi})
  })
  .catch(error => console.log(error)); 
}
)



app.get("/random-beers", (req, res, next) => {
  console.log("¿quién lo desenladrillará?");
  
  let randomBeer = punkAPI.getRandom()
  randomBeer.then(beer => {
    res.render("random-beers", {beer})
  })
  .catch(error => console.log(error));
}
)


app.get("/chosenbeer/:id", (req, res, next) => {

  let chosenbeer = punkAPI.getBeer(req.params.id)
  chosenbeer.then(beer => {
    res.render("chosenbeer", {chosenbeer: beer})
  })
  .catch(error => console.log(error));
}
)




app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
