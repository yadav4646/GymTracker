import http from "node:http";

const PORT = 3000;

type CreateUserBody = {
  email?: string;
  name?: string;
};

const server = http.createServer((req, res) => {
  const method = req.method;

  const readUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
  const url = readUrl.pathname;

  if (method === "POST" && url === "/plans") {
    const chunks: Buffer[] = [];
    console.log(chunks);

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    console.log(chunks);

    req.on("end", () => {
      try {
        const rawBody = Buffer.concat(chunks).toString("utf-8");
        if (!rawBody) {
          res.statusCode = 400;
          res.end("Req body is required");
          return;
        }
        console.log(rawBody);

        const body = JSON.parse(rawBody) as CreateUserBody;
        console.log(body);

        if (!body.name || !body.email) {
          res.statusCode = 400;
          res.end("Both Name and Email is required");
          return;
        }

        res.statusCode = 201;
        res.end(`User is created ${body.name}`);
      } catch {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });

    req.on("error", () => {
      res.statusCode = 500;
      res.end("Failed to req body");
    });
    return;
  }

  res.statusCode = 404;
  res.end("Route not found");
});

server.listen(PORT, () => {
  console.log("Server Is runnig");
});
