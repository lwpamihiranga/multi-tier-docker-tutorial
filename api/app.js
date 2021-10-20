const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const PORT = 5000;

// setup middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json('api is working!');
});

// start server
app.listen(PORT, () => {
  console.log(`API is listening on PORT: ${PORT}`);
});
