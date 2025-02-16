import { io } from "socket.io-client";

const API_URL=import.meta.env.VITE_CHAT_API_URL

const SOCKET_URL =API_URL;

export const socket = io(SOCKET_URL, {
    autoConnect: false, 
});
