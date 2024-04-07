import {
  listRequest,
  sectionDataRequest,
  updateRequest,
  userSectionDataRequest,
} from "../../service/ProductService";

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

export const  createUpdateAction = (requestBody) => async (dispatch) => {
  const response = await dispatch(updateRequest(requestBody));
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

export const sectionDataAction = () => async (dispatch) => {
  const response = await dispatch(sectionDataRequest());
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

export const userSectionDataAction = (data) => async (dispatch) => {
  const response = await dispatch(userSectionDataRequest(data));
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
