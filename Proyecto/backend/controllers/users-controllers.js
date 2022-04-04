const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'No se pudo encontrar al usuario solicitado.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Datos invalidos, intenta de nuevo.', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Falló en SignUp, intenta de nuevo.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'El usuario ya existe, has login.',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image,
    password
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Fallo en Signup, por favor intenta de nuevo.',
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) }); // createdUser includes the PW
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Fallo en Loggin, por favor intenta de nuevo.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Credenciales invalidas, revisalas e intenta de nuevo.',
      401
    );
    return next(error);
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
