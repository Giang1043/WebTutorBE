const AppError = require("./AppError");

const handleError = (error, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.errors ? { errors: error.errors } : {}),
    });
  }
  return next(error);
};

module.exports = handleError;
