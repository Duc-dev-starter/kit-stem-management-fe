import axios from "axios";
import config from "../secret";
import { message } from "antd";
import { PATH } from "../consts";

export const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 300000,
    timeoutErrorMessage: 'Connection is timeout exceeded'
})

let isTokenExpired = false;

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      return response;
    },
    (error) => {
      if (error.response) {
        const { data } = error.response;
        console.log(error.response);
        if (data.errors && data.errors.length > 0) {
          data.errors.forEach((error: { field: string, message: string }) => {
            message.error(`${error.field}: ${error.message}`);
          });
        }
  
        else {
          switch (error.response.status) {
            case 403: {
              if (!isTokenExpired) {
                isTokenExpired = true
                message.error(data.message);
                // const user = getUserFromLocalStorage();
                // setTimeout(() => {
                //   if(user){
                //     if (user.role === roles.ADMIN) {
                //       window.location.href = paths.ADMIN_LOGIN;
                //     }
                //       else{
                //         window.location.href = paths.LOGIN;
                //       }
                //   }else{
                //     return;
                //   }
                  
                //   localStorage.clear();
                //   isTokenExpired = false;
                // }, 1300);
              }
              break;
            }
  
            case 404:
              message.error(data.message);
              // window.location.href = PATH.NOTFOUND;
              break;
  
            case 500:
              message.error(data.message);
              window.location.href = PATH.INTERNAL_SERVER_ERROR;
              break;
  
            default:
              message.error(data.message);
              break;
          }
        }
  
        return Promise.reject(error.response.data);
      } else {
        message.error('Network error');
        return Promise.reject(error);
      }
    }
  );
  
  
export default axiosInstance  