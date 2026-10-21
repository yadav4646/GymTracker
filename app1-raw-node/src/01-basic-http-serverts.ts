import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;

///req -> request Object
// method -> get, put, patch, post, options, delete
//url -> /users // path
// headers -> metadata sent by the client()
// req body -> data sent by client
// res -> data sent TO client
// Status code
// response headers
// response bod
// end to end the request

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    // Get, post, put, patch, delete
    const url = req.url;
    // in which path the client is requeting
    const userAgent = req.headers["user-agent"];
    // info aboutt he client
    // const statusCode = 200;
    res.statusCode = 201;
    // the response code the server will send
    const resHeader = res.setHeader("Content-Type", "text/plain");
    // the response/message the client that the response body contains
    res.end(`Basic http node server: ${method} : ${url}: ${userAgent} :} }`);
  },
);

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
