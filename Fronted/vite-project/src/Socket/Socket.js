import { io } from "socket.io-client";

const SOCKET_URL = "https://airbnb-clones-1.onrender.com";

export const socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    autoConnect: true,
});