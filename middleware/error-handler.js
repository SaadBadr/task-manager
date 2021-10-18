const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError)
    return res.status(err.statusCode).json({ msg: err.message, error: err });
  return res
    .status(500)
    .json({ msg: 'something went wrong, try again later...', error: err });
};

module.exports = errorHandlerMiddleware;
