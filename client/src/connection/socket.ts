import { io } from "socket.io-client";

const env = process.env.NODE_ENV;

const determineClientSideAddress = (env: string) => {
  if (env === "production") {
    return "https://nft-tic-tac-toe.herokuapp.com";
  } else {
    return "http://localhost:8080";
  }
};

export const socket = io(determineClientSideAddress(env));
