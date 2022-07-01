const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  creator: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: { type: String, required: true },
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;
