import axios from "axios";
import { API_CONFIG, API_HEADERS } from "../../config/ApiConfig";


/**
 * Application API Calls handler
 */
export const axiosApi = axios.create({
  baseURL: API_CONFIG.API_HOST,
  headers: API_HEADERS,
  validateStatus: function (status) {
    handleResponse(status);
    return status >= 200 && status < 300; // default
  },
});

/**
 * Handles Error response Codes
 * @param {*} statusCode
 * @returns
 */
function handleResponse(statusCode) {
  if (statusCode >= 400) {
    if (statusCode === 401) {
      // auto logout if 401 response returned from api
    }
  } else if (statusCode === 301) {
    // console.log(response);
  }
  return statusCode;
}
