import { API_CONFIG, API_HEADERS } from "../../config/ApiConfig";
import { axiosApi } from "./AaxiosUtil";

/**
 *
 * @param {*} path  API PATH
 * @param {*} data  Optional in GET
 * @param {*} isSendAuthToken  send true for authentocated calls false for non-login users
 * @returns GET API CALL RESPONSE
 */
export const postRequest = (path, data = null, isSendAuthToken = false) => {
  let apiUrl = API_CONFIG.API_HOST + path;

  return axiosApi
    .post(apiUrl, data, {
      headers: isSendAuthToken
        ? {
            ...API_HEADERS,
            Authorization: "Bearer " + localStorage.getItem("userId"),
          }
        : API_HEADERS,
    })
    .then((response) => {
      // FAILBLOCK block
      if (response.status === 401) {
        // handle error
      } else {
        // return the response

        return response;
      }
    })
    .catch((error) => {
      // error block
      return error.response;
    });
};
