import http, { ServerResponse } from "node:http";

const PORT = 3000;

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

const users: User[] = [
  { id: 1, name: "Kuldeep", email: "@gmailconm" },
  { id: 2, name: "Yadav", email: "@Yadav" },
];

function sendJson<T>(
  res: ServerResponse,
  statusCode: number,
  body: ApiResponse<T>,
): void {
  ((res.statusCode = statusCode),
    res.setHeader("Content-Type", "application/json"),
    res.end(JSON.stringify(body)));
}
const server = http.createServer((req, res) => {
  const method = req.method;
  const urlPath = new URL(req.url ?? "/", `http:${req.headers.host}`);
  const path = urlPath.pathname;

  if (method === "GET" && path === "/") {
    sendJson(res, 200, {
      success: true,
      message: "Server is runnung",
      data: {
        routes: ["GET/users"],
      },
    });
    return;
  }

  if (method === "GET" && path === "/user") {
    sendJson(res, 200, {
      success: true,
      message: "User is fetched",
      data: users,
    });
    return;
  }

  sendJson<null>(res, 404, {
    success: false,
    message: "route not found",
    error: `${method} ${path} is not there`,
  });
});

server.listen(PORT, () => {
  console.log("Server Is runnig");
});
