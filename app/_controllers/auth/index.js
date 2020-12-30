const { Router } = require('express');
const { accessRouter } = require('./routes.auth');
const authRouter = Router();

authRouter.use(accessRouter);

module.exports = {
  authRouter,
}