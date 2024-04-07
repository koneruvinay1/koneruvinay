import { postRequest } from "./config/PostRequest";
import { USER_API_PATH } from "../config/apiPaths";
import { getRequest } from "./config/GetRequest";

/**
 * Login Request
 *
 * @param {*} data
 * @returns
 */
export const loginRequest = (data) => async () => {
  try {
    let result = await postRequest(USER_API_PATH.LOGIN_PATH, data, false);
    return result;
  } catch (error) {
    // TODO Handle Error
    return error;
  }
};

export const updateRequest = (data) => async () => {
  try {
    let result = await postRequest(USER_API_PATH.UPDATE_USER, data, false);
    return result;
  } catch (error) {
    // TODO Handle Error
    return error;
  }
};

/**
 *
 * @returns Logout user
 */
export const logoutUser = () => localStorage.removeItem("authToken");

/**
 *
 * @returns is User Login or not?
 */
export const isAuthenticated = () => {
  return localStorage.getItem("userId") ? true : false;
};

/**
 * Check User Role.
 *
 * @param {*} roles
 * @returns
 */
export const checkUserAccess = (roles) => {
  if (
    roles &&
    roles.length > 0 &&
    roles.includes(localStorage.getItem("user_role"))
  ) {
    return true;
  } else {
    return false;
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("userId"));
};

export const listRequest = (data) => async () => {
  try {
    let result = await getRequest(
      `${USER_API_PATH.LIST_PATH}?limit=${data.limit}&offset=${data.offset}&role=${data.role}`,
      null,
      false
    );
    return result;
  } catch (error) {
    console.log(error);
    // TODO Handle Error
  }
};

export const createUpdateRequest = (data) => async () => {
  try {
    let result = await postRequest(
      USER_API_PATH.REGISTRATION_PATH,
      data,
      false
    );
    return result;
  } catch (error) {
    // TODO Handle Error
    return error;
  }
};
