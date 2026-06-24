import { WebSocketServer } from "ws";

const initializeSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log("Client Connected");

    socket.send(
      JSON.stringify({
        type: "WELCOME",
        message: "Connected Successfully",
      }),
    );

    socket.on("message", (message) => {
      console.log("Received:", message.toString());

      socket.send(
        JSON.stringify({
          type: "MESSAGE",
          message: message.toString(),
        }),
      );
    });

    socket.on("close", () => {
      console.log("Client Disconnected");
    });

    socket.on("error", (error) => {
      console.log(error);
    });
  });
};

export default initializeSocket;
