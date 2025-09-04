const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = new ErrorHandler('JSON Web Token is invalid, Try again', 400);
  }
  if (err.name === 'TokenExpiredError') {
    err = new ErrorHandler('JSON Web Token is expired, Try again', 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
