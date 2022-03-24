const express = require('express');

const app = express();
const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get('/',
  (req, res) => {
    res.render('home');
  }
);

app.get('/hello/:name',
  (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}!`);
  }
);

app.listen(3000,
  () => {
    console.log(`Gif Search listening on http://localhost:3000/`);
  }
);
