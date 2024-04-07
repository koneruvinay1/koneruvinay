import {
  listRequest,
 
  updateRequest,
  
} from "../../service/OrderService";

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




