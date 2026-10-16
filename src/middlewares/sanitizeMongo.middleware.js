const AppError = require("../utils/AppError");

const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);
const MAX_DEPTH = 32;

const clean = (value, depth = 0) => {
  if (value === null || typeof value !== "object") return value;
  if (depth > MAX_DEPTH) {
    throw new AppError("Request input is nested too deeply", 400);
  }

  for (const key of Object.keys(value)) {
    if (key.startsWith("$") || key.includes(".") || DANGEROUS_KEYS.has(key)) {
      delete value[key];
      continue;
    }
    clean(value[key], depth + 1);
  }
  return value;
};

const sanitizeMongo = (req, _res, next) => {
  try {
    clean(req.body);
    clean(req.query);
    clean(req.params);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = sanitizeMongo;
