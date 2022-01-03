import { io } from "socket.io-client";

//export const socket = io("http://localhost:8080");
console.log(process.env.NODE_ENV);

export const socket = io("https://nft-tic-tac-toe.herokuapp.com");

//export const socket = io("window.location.hostname");
