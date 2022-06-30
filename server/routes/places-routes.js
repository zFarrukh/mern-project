const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
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

router.get('/:pid', (req, res) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  res.status(200).json({ place });
});

module.exports = router;
