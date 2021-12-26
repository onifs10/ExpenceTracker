import ServiceResponseType from "../types/global.type";

export type AsyncServiceFunction<Input> = (
  input: Input
) => Promise<ServiceResponseType>;

export interface CRUDServiceTemplate<
  GetQuery = void,
  SingleQuery = void,
  CreateInput = void,
  UpdateInput = void,
  DeleteQuery = void
> {
  get: AsyncServiceFunction<GetQuery>;
  single: AsyncServiceFunction<SingleQuery>;
  create: AsyncServiceFunction<CreateInput>;
  update: AsyncServiceFunction<UpdateInput>;
  delete: AsyncServiceFunction<DeleteQuery>;
}
