import { ORDER_API_PATH } from "../config/apiPaths";
import { getRequest } from "./config/GetRequest";
import { postRequest } from "./config/PostRequest";

export const listRequest = (data) => async () => {
  try {
    let result = await getRequest(
      `${ORDER_API_PATH.LIST_PATH}?limit=${data.limit}&offset=${data.offset}`,
      null,
      false
    );
    return result;
  } catch (error) {
    console.log(error);
    // TODO Handle Error
  }
};
export const updateRequest = (data) => async () => {
  try {
    let result = await postRequest(
      ORDER_API_PATH.CREATE_UPDATE,
      data,
      false
    );
    return result;
  } catch (error) {
    // TODO Handle Error
    return error;
  }
};



