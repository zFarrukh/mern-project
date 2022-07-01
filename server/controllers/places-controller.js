const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const Place = require('../models/places-model');

let DUMMY_PLACES = [
  {
    id: '1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    creator: '1',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: '20 W 34th St, New York, NY 10001',
  },

  {
    id: '2',
    title: 'Statue of Liberty',
    description: 'Also one of the most famous sky scrapers in the world!',
    creator: '2',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: '10 Jay St, New York, NY 10012, USA',
  },
];

const getPlaceById = (req, res) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError('Could not find a place for the provided id', 404);
  }

  res.status(200).json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (places.length === 0) {
    return next(new HttpError('No places found', 404));
  }
  res.status(200).json({ places });
};

const createPlace = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed', 422);
  }
  const { title, description, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    address,
    creator,
    image:
      'https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI',
  });

  try {
    await createdPlace.save();
    res.status(201).json({ place: createdPlace });
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }
};

const updatePlace = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed', 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError('Could not find a place for the provided id', 404);
  }

  place.title = title || place.title;

  place.description = description || place.description;

  res.status(200).json({ place: place });
};

const deletePlace = (req, res) => {
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== req.params.pid);
  res.status(200).json({ message: 'Deleted place' });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  deletePlace,
  updatePlace,
};
