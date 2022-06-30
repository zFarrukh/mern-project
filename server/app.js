const express = require('express');
const bodyParser = require('body-parser');

const placesRouter = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRouter);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || 'An unknown error occurred!' });
});

app.listen(8000, () => {});
