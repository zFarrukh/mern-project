const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');

const DUMMY_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed', 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: Math.floor(Math.random() * 100000),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json(createdUser);
};

const login = (req, res) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || password !== identifiedUser.password) {
    throw new HttpError('Could not identify user', 401);
  }

  res.json({ message: 'Logged in!' });
};

module.exports = {
  getUsers,
  signup,
  login,
};
