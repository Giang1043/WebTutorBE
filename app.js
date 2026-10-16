const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const corsOptions = require("./src/configs/cors");
const errorMiddleware = require("./src/middlewares/error.middleware");
const paginationGuard = require("./src/middlewares/paginationGuard.middleware");
const sanitizeMongo = require("./src/middlewares/sanitizeMongo.middleware");
const securityHeaders = require("./src/middlewares/securityHeaders.middleware");
const routes = require("./src/routes");
const healthRoutes = require("./src/routes/health");
const { errorResponse } = require("./src/utils/response");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.set("etag", false);
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use("/health", healthRoutes);
app.use("/api", sanitizeMongo, paginationGuard, routes);
app.use((_req, res) =>
  errorResponse(res, { statusCode: 404, message: "Route not found" }),
);
app.use(errorMiddleware);

module.exports = app;
