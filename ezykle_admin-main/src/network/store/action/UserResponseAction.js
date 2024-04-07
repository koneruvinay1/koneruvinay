import {
  listRequest,
  loginRequest,
  createUpdateRequest,
} from "../../service/UserService";

/**
 * Login Action
 *
 * @param {*} data  JSON DATA TO SEND TO SERVER
 * @returns API RESULT
 */
export const loginAction = (requestData) => async (dispatch) => {
  const response = await dispatch(loginRequest(requestData));
  if (
    (response &&
      Object.keys(response).length &&
      response?.data?.status === 201) ||
    200
  ) {
    if (response.data && response.data.result && response.data.result.id) {
      await localStorage.setItem("userId", response.data.result.id);
      await localStorage.setItem("user_role", response.data.result.role);
      await localStorage.setItem("userName", response.data.result.name);
      await localStorage.setItem("userEmail", response.data.result.email);
      await localStorage.setItem("userPhone", response.data.result.phone);
    }

    return Promise.resolve(response.data);
  } else {
    return Promise.resolve(null);
  }
};
export const listAction = (data) => async (dispatch) => {
  const response = await dispatch(listRequest(data));
  console.log(response);
  if (
    (response &&
      Object.keys(response).length &&
      response?.data?.status == 201) ||
    200
  ) {
    console.log(response);
    return Promise.resolve(response.data);
  } else {
    return Promise.resolve(null);
  }
};

export const createUpdateAction = (requestBody) => async (dispatch) => {
  const response = await dispatch(createUpdateRequest(requestBody));
  console.log(response);
  if (
    (response &&
      Object.keys(response).length &&
      response?.data?.status == 201) ||
    200
  ) {
    console.log(response);
    return Promise.resolve(response.data);
  } else {
    return Promise.resolve(null);
  }
};
