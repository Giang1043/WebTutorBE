# WebTutorCenter BE — VS01 Application Foundation

This slice is an isolated Express foundation. It intentionally contains no
business feature or legacy repository import.

## Run

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

`GET /health` is available without MongoDB so the process can be smoke-tested
before infrastructure credentials are configured. Set `MONGODB_URI` to enable
the database connection during startup. In production, a missing database URI
fails fast.

## Response convention

Success:

```json
{
  "success": true,
  "message": "Service is healthy",
  "data": { "service": "webtutorcenter-api", "status": "ok" }
}
```

Errors use `{ success: false, message, errors? }`. Internal errors are logged
server-side and never expose stack traces to clients.
