const { errorResponse } = require("../utils/response");

const errorMiddleware = (error, req, res, _next) => {
  if (error.isUserError || (error.statusCode && error.statusCode < 500)) {
    return errorResponse(res, {
      statusCode: error.statusCode || 400,
      message: error.message,
      errors: error.errors,
    });
  }

  console.error(`[SYSTEM ERROR] ${req.method} ${req.originalUrl}`);
  console.error(error.stack || error);
  return errorResponse(res, {
    statusCode: 500,
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;
