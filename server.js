require("dotenv").config();

const http = require("node:http");
const app = require("./app");
const { connectDatabase } = require("./src/configs/database");

const port = Number(process.env.PORT || 5002);
const server = http.createServer(app);

const startServer = async () => {
  await connectDatabase();
  server.listen(port, () => {
    console.log(`WebTutorCenter API listening on port ${port}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Unable to start WebTutorCenter API:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { server, startServer };
