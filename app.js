const express = require('express');
const app = express();

require('dotenv').config();

const { engine } = require('express-handlebars');
const fetch = require('node-fetch');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.set("views", "./views");

function build_tenor_url(query){
  return `https://g.tenor.com/v1/search?q=${query.replace(/\s+/g, '-')}&key=${process.env.API_KEY}&limit=8`
}

app.get('/',
  (req, res) => {
    const gifInput = req.query.gifInput;
    if (gifInput) {
      const tenorUrl = build_tenor_url(gifInput);
      fetch(tenorUrl)
      .then(response => response.json())
      .then(
        (data) => {
          const gifs = data.results;
          res.render('home', { gifs })
        }
      );
    }
    else {
      res.render('home');
    }
  }
);

app.listen(3000,
  () => {
    console.log(`Gif Search listening on http://localhost:3000/`);
  }
);
