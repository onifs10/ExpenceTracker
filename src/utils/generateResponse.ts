import ServiceResponseType, { ResponseStateType } from "../types/global.type";
import { ApiResponse } from "./responseHelper";

/**
 * to reduce repetition in the code base i created this
 * ulitizer function to add responses from the services
 * to the  api response object
 * @param serviceResponse
 * @param apiResponse
 * @returns void
 */

const generateResponse = (
  serviceResponse: ServiceResponseType,
  apiResponse: ApiResponse
): void => {
  if (serviceResponse.state === ResponseStateType.SUCCESS) {
    apiResponse.success(200);
  } else {
    apiResponse.error(500);
  }
  apiResponse.message(serviceResponse.message);
  if (serviceResponse.data) {
    apiResponse.data(serviceResponse.data);
  }
};

export default generateResponse;
