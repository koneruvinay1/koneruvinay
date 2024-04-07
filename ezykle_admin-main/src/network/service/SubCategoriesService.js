import { OPTIONS_API_PATH } from "../config/apiPaths";
import { getRequest } from "./config/GetRequest";
import { postRequest } from "./config/PostRequest";


export const listRequest = (data) => async () => {
  try {
    let result = await getRequest(
      `${OPTIONS_API_PATH.LIST_PATH}?limit=${data.limit}&offset=${data.offset}&sectionId=${data.sectionId}`,
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
    let result = await postRequest(`${OPTIONS_API_PATH.LIST_PATH}/${data.id}`, data, false);
    return result
  } catch (error) {
    // TODO Handle Error
    return error;
  }
};