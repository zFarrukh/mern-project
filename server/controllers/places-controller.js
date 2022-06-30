const HttpError = require('../models/http-error');

let DUMMY_PLACES = require('../models/places-model');

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

const createPlace = (req, res) => {
  const { title, description, coordinates, address, creator } = req.body;
  const id = Math.round(Math.random() * 100000).toString();

  const createdPlace = {
    title,
    description,
    location: coordinates,
    address,
    creator,
    id,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res) => {
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
