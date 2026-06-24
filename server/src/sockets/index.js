import { WebSocketServer } from "ws";

const initializeSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log("Client Connected");
    console.log("Current Clients:", wss.clients.size);

    socket.send(
      JSON.stringify({
        type: "WELCOME",
        message: "Connected Successfully",
      }),
    );

    //single tab
    // socket.on("message", (message) => {
    //   console.log("Received:", message.toString());

    //   socket.send(
    //     JSON.stringify({
    //       type: "MESSAGE",
    //       message: message.toString(),
    //     }),
    //   );
    // });

    //two tab
    // socket.on("message", (message) => {
    //   console.log("Received:", message.toString());

    //   wss.clients.forEach((client) => {
    //     client.send(
    //       JSON.stringify({
    //         type: "MESSAGE",
    //         message: message.toString(),
    //       }),
    //     );
    //   });
    // });

    socket.on("message", (message) => {
      console.log("Total Clients:", wss.clients.size);

      wss.clients.forEach((client) => {
        console.log("Sending to client");

        client.send(
          JSON.stringify({
            type: "MESSAGE",
            message: message.toString(),
          }),
        );
      });
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
