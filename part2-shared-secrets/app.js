// Part 2 - SHARED SECRETS FILE (insecure on purpose)
// Secrets live in .env instead of app.js, but .env is committed to the
// repository, so anyone who clones the repo still gets every secret.

require("dotenv").config({ path: "./.env", quiet: true });

const http = require("http");
const fs = require("fs");

const { PORT, DB_USER, DB_PASSWORD, API_KEY } = process.env;

const mask = (value) => value.slice(0, 3) + "*".repeat(value.length - 3);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  res.setHeader("Content-Type", "text/plain");

  // Simple operation #1: the API key protects the endpoint
  if (url.searchParams.get("key") !== API_KEY) {
    res.statusCode = 401;
    return res.end("401 Unauthorized - pass ?key=<API_KEY>\n");
  }

  // Simple operation #2: "log in" to a pretend database with the credentials
  const files = fs.readdirSync("./").join("\n");
  res.statusCode = 200;
  res.end(
    `Secrets source: .env file committed to the repo\n` +
      `Connected to DB as ${DB_USER} (password ${mask(DB_PASSWORD)})\n\n` +
      `Files in this folder:\n${files}\n`
  );
});

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/?key=${API_KEY}`);
});
