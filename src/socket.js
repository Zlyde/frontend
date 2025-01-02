import { io } from "socket.io-client";

// Anslut till backend-servern
const socket = io("http://localhost:3000", {
  transports: ["websocket"], // Använd WebSocket för snabbare kommunikation
  reconnectionAttempts: 5, // Försök att återansluta 5 gånger om anslutningen bryts
});

// Exportera socket-instansen
export default socket;
