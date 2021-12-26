import { type } from "os";
import IncomeModel from "../models/Income.model";
import { ResponseStateType } from "../types/global.type";
import { CRUDServiceTemplate } from "./service.template";

type getQuery = {
  user_id: number;
};

type createQuery = {
  user_id: number;
  amount: number;
};

interface IncomeServiceInterface
  extends CRUDServiceTemplate<getQuery, getQuery, createQuery> {}

const IncomeService: IncomeServiceInterface = {
  get: async (input) => {
    try {
      const income = await IncomeModel.findOne({
        where: { user_id: input.user_id },
      });

      if (income) {
        return {
          state: ResponseStateType.SUCCESS,
          message: "user income",
          data: {
            income,
          },
        };
      } else {
        return {
          state: ResponseStateType.SUCCESS,
          message: "income not found",
          statusCode: 404,
        };
      }
    } catch (e: any) {
      return {
        state: ResponseStateType.ERROR,
        message: "error occured",
      };
    }
  },
  create: async (input) => {
    try {
      let income = await IncomeModel.findOne({
        where: { user_id: input.user_id },
      });
      if (!income) {
        income = await IncomeModel.create({
          user_id: input.user_id,
          amount: input.amount,
        });
      }
      return {
        state: ResponseStateType.SUCCESS,
        message: "income created",
        data: {
          income,
        },
      };
    } catch (e: any) {
      return {
        state: ResponseStateType.ERROR,
        message: e.message || "error occured",
      };
    }
  },
  single: async (input) => {
    throw new Error("Function not implemented.");
    try {
      return {
        state: ResponseStateType.SUCCESS,
        message: "error occured",
      };
    } catch (e: any) {
      return {
        state: ResponseStateType.ERROR,
        message: e.message || "error occured",
      };
    }
  },
  update: async (input) => {
    throw new Error("Function not implemented.");
    try {
      return {
        state: ResponseStateType.SUCCESS,
        message: "error occured",
      };
    } catch (e: any) {
      return {
        state: ResponseStateType.ERROR,
        message: e.message || "error occured",
      };
    }
  },
  delete: async (input) => {
    throw new Error("Function not implemented.");
    try {
      return {
        state: ResponseStateType.SUCCESS,
        message: "error occured",
      };
    } catch (e: any) {
      return {
        state: ResponseStateType.ERROR,
        message: e.message || "error occured",
      };
    }
  },
};

export default IncomeService;
