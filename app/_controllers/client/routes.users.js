const { Router } = require('express');
const usersRouter = Router();

usersRouter
  .route('/')
  .get((req, res) => res.json({ success: true, msg: 'GET: view users' }));

usersRouter
  .route('/:userID')
  .get((req, res) => res.json({ success: true, msg: 'GET: view one user' }));

module.exports = {
  usersRouter,
};