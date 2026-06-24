// import { WebSocketServer } from "ws";

// const initializeSocket = (server) => {
//   const wss = new WebSocketServer({ server });

//   wss.on("connection", (socket) => {
//     console.log("Client Connected");
//     console.log("Current Clients:", wss.clients.size);

//     socket.send(
//       JSON.stringify({
//         type: "WELCOME",
//         message: "Connected Successfully",
//       }),
//     );

//     //single tab
//     // socket.on("message", (message) => {
//     //   console.log("Received:", message.toString());

//     //   socket.send(
//     //     JSON.stringify({
//     //       type: "MESSAGE",
//     //       message: message.toString(),
//     //     }),
//     //   );
//     // });

//     //two tab
//     // socket.on("message", (message) => {
//     //   console.log("Received:", message.toString());

//     //   wss.clients.forEach((client) => {
//     //     client.send(
//     //       JSON.stringify({
//     //         type: "MESSAGE",
//     //         message: message.toString(),
//     //       }),
//     //     );
//     //   });
//     // });

//     socket.on("message", (message) => {
//       console.log("Total Clients:", wss.clients.size);

//       wss.clients.forEach((client) => {
//         console.log("Sending to client");

//         client.send(
//           JSON.stringify({
//             type: "MESSAGE",
//             message: message.toString(),
//           }),
//         );
//       });
//     });

//     socket.on("close", () => {
//       console.log("Client Disconnected");
//     });

//     socket.on("error", (error) => {
//       console.log(error);
//     });
//   });
// };

// export default initializeSocket;

// import { WebSocketServer } from "ws";

// const initializeSocket = (server) => {
//   const wss = new WebSocketServer({ server });

//   wss.on("connection", (socket) => {
//     console.log("Client Connected");
//     console.log("Current Clients:", wss.clients.size);

//     socket.room = null;

//     socket.send(
//       JSON.stringify({
//         type: "WELCOME",
//         message: "Connected Successfully",
//       }),
//     );

//     socket.on("message", (message) => {
//       const data = JSON.parse(message.toString());

//       // Join Room
//       if (data.type === "JOIN_ROOM") {
//         socket.room = data.room;

//         console.log(`Joined Room: ${data.room}`);

//         return;
//       }

//       // Room Message
//       if (data.type === "MESSAGE") {
//         wss.clients.forEach((client) => {
//           if (client.room === socket.room) {
//             client.send(
//               JSON.stringify({
//                 type: "MESSAGE",
//                 room: socket.room,
//                 message: data.message,
//               }),
//             );
//           }
//         });
//       }
//     });

//     socket.on("close", () => {
//       console.log("Client Disconnected");
//     });

//     socket.on("error", (error) => {
//       console.log(error);
//     });
//   });
// };

// export default initializeSocket;
import { WebSocketServer } from "ws";

const initializeSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log("Client Connected");

    socket.room = null;

    socket.send(
      JSON.stringify({
        type: "WELCOME",
        message: "Connected Successfully",
      }),
    );

    socket.on("message", (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "JOIN_ROOM") {
        socket.room = data.room;

        console.log(`Joined Room: ${data.room}`);
        return;
      }

      if (data.type === "MESSAGE") {
        wss.clients.forEach((client) => {
          if (client.room === socket.room) {
            client.send(
              JSON.stringify({
                type: "MESSAGE",
                room: socket.room,
                message: data.message,
              }),
            );
          }
        });
      }
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
