import http from "node:http";

const PORT = 3000;
const server = http.createServer((req, res) => {
  const method = req.method ?? "GET";
  res.setHeader("Content-Type", "text/plain");

  const reqURL = new URL(req.url ?? "/", `http:${req.headers.host}`);
  console.log(reqURL);
  console.log(req.url);
  console.log(req.headers.host);
  const pathName = reqURL.pathname;

  if (method === "GET" && pathName === "/health") {
    res.statusCode = 200;
    res.end("Server is healthy");
    return;
  }

  if (method === "GET" && pathName === "/plans") {
    res.statusCode = 201;
    res.end("These are the Plans");
    return;
  }

  res.statusCode = 404;
  res.end("No Path");
});

server.listen(PORT, () => {
  console.log("Server Active");
});
