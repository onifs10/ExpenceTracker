import { Dialect } from "sequelize/types";

// types

export interface DbConfigType {
  HOST: string;
  USER: string;
  DB: string;
  PASSWORD: string;
  dialect: Dialect;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const config: DbConfigType = {
  HOST: "127.0.0.1",

  USER: "root",

  PASSWORD: "",

  DB: "expensetracker",

  dialect: "mysql",

  pool: {
    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000,
  },
};

const configTwo: DbConfigType = {
  HOST: "127.0.0.1",

  USER: "root",

  PASSWORD: "Booktime21#",

  DB: "expensetracker",

  dialect: "mysql",

  pool: {
    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000,
  },
};

export default { config, configTwo };

