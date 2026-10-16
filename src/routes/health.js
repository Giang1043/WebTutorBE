const express = require("express");
const { successResponse } = require("../utils/response");

const router = express.Router();

router.get("/", (_req, res) =>
  successResponse(res, {
    message: "Service is healthy",
    data: {
      service: "webtutorcenter-api",
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  }),
);

module.exports = router;
