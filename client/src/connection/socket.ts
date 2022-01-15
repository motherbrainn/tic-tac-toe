import { io } from "socket.io-client";
import { prodUrl } from "../prodConsts";

const env = process.env.NODE_ENV;

const determineClientSideAddress = (env: string) => {
  if (env === "production") {
    return prodUrl;
  } else {
    return "http://localhost:8080";
  }
};

export const socket = io(determineClientSideAddress(env));
