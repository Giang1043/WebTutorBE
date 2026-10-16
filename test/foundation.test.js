const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");

const app = require("../app");

const request = (path) =>
  new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const { port } = server.address();
      http.get({ hostname: "127.0.0.1", port, path }, (response) => {
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          server.close();
          resolve({ statusCode: response.statusCode, headers: response.headers, body });
        });
      }).on("error", (error) => {
        server.close();
        reject(error);
      });
    });
  });

test("GET /api/health returns the foundation health contract", async () => {
  const response = await request("/api/health");
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(body.success, true);
  assert.equal(body.data.status, "ok");
  assert.equal(response.headers["x-content-type-options"], "nosniff");
});

test("GET /health keeps the platform health probe available at the root", async () => {
  const response = await request("/health");
  assert.equal(response.statusCode, 200);
  assert.equal(JSON.parse(response.body).success, true);
});

test("unknown routes use the standard error response", async () => {
  const response = await request("/api/unknown");
  const body = JSON.parse(response.body);
  assert.equal(response.statusCode, 404);
  assert.deepEqual(body, { success: false, message: "Route not found" });
});
