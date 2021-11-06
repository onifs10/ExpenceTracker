import { Algorithm } from "jsonwebtoken";

export interface configTypes {
  secret_key: string;
  isUser: string;
  audience: string;
  expiresIn: string;
}

const config: configTypes = {
  secret_key: "sample",
  isUser: "sample",
  audience: "sample",
  expiresIn: "1d",
};

export default config;
