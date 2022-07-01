const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRouter);

app.use('/api/users', usersRouter);

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

mongoose
  .connect(
    'mongodb+srv://Farrux:test12345@testcluster.pvbby.mongodb.net/places?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(8000, () => {});
  })
  .catch((err) => {
    console.log(err);
  });
