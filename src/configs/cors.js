const AppError = require("../utils/AppError");

const normalizeOrigin = (value) => {
  try {
    return new URL(value).origin;
  } catch {
    throw new Error(`Invalid CLIENT_URL origin: ${value}`);
  }
};

const configuredOrigins = (process.env.CLIENT_URL || "http://localhost:4000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map(normalizeOrigin);

if (process.env.NODE_ENV === "production" && configuredOrigins.length === 0) {
  throw new Error("CLIENT_URL is required in production");
}

const isAllowedOrigin = (origin) =>
  !origin || configuredOrigins.includes(origin);

module.exports = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new AppError("Origin is not allowed", 403));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: process.env.NODE_ENV === "production" ? 600 : 0,
};
