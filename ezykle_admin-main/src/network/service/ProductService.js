import { PRODUCT_API_PATH } from "../config/apiPaths";
import { getRequest } from "./config/GetRequest";
import { postRequest } from "./config/PostRequest";

export const listRequest = (data) => async () => {
  try {
    let result = await getRequest(
      `${PRODUCT_API_PATH.LIST_PATH}?limit=${data.limit}&offset=${data.offset}`,
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
      PRODUCT_API_PATH.CREATE_UPDATE,
      data,
      false
    );
    return result;
  } catch (error) {
    // TODO Handle Error
    return error;
  }
};

export const sectionDataRequest = () => async () => {
  try {
    let result = await getRequest(
      `${PRODUCT_API_PATH.SECTION_DATA}`,
      null,
      false
    );
    return result;
  } catch (error) {
    console.log(error);
    // TODO Handle Error
  }
};

export const userSectionDataRequest = (data) => async () => {
  try {
    let result = await getRequest(
      `${PRODUCT_API_PATH.SECTION_DATA}?userId=${data.userId}`,
      null,
      false
    );
    return result;
  } catch (error) {
    console.log(error);
    // TODO Handle Error
  }
};
