export interface ConfigTypes {
  secret_key: string;
  isUser: string;
  audience: string;
  expiresIn: string;
}

const config: ConfigTypes = {
  secret_key: "sample",
  isUser: "sample",
  audience: "sample",
  expiresIn: "120",
};

export default config;
