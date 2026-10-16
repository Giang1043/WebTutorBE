class AppError extends Error {
  constructor(message, statusCode, errors = undefined) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isUserError = true;
  }
}

module.exports = AppError;
