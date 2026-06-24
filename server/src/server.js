import dotenv from "dotenv";
import http from "http";
import initializeSocket from "./sockets/index.js";
import app from "../app.js";

dotenv.config();

const server = http.createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
