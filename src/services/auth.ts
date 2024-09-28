import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {API, PATH, roles} from "../consts";
import {User} from "../models";
import { message } from "antd";
import { BaseService } from '../services';
import {JwtPayload} from '../interfaces'
import { getUserFromLocalStorage } from "../utils";


export async function login(email: string, password: string){
    const response = await BaseService.post({url: API.LOGIN, payload: {email, password}});
    if (response.success) {
      const token = response.data.token;
      const decodedToken: JwtPayload = jwtDecode(token);
      if (decodedToken.role === roles.ADMIN || decodedToken.role === roles.CUSTOMER || decodedToken.role === roles.MANAGER || decodedToken.role === roles.STAFF) {
        if (window.location.pathname.includes('/admin') ) {
          if(decodedToken.role !== roles.ADMIN){
            message.error("You don't have permission to access this page");
            return null;
          }
        }
        else{
          if (decodedToken.role === roles.ADMIN) {
            message.error(`You login wrong path. Navigate in 2s`);
           setTimeout(() => {
             window.location.href = PATH.ADMIN_LOGIN;
           }, 2000)
            return null;
          }
        }
        return { token };
      } else {
        message.error("Invalid user role");
      }
    }else{
      return;
    }
}

// export const loginWithGoogle = async (googleId: string, navigate: ReturnType<typeof useNavigate>, setIsModalVisible: (visible: boolean) => void) => {
//   try {
//     const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
//       google_id: googleId,
//     });
//     localStorage.setItem("token", responseLogin.data.token);
//     const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
//     localStorage.setItem("user", JSON.stringify(currentUser.data));
//     message.success("Login successfully");
//     navigate(paths.HOME);
//   } catch (error) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     if(error.message === "Your account has been locked. Please contact admin via mail to activate!"){
//       return;
//     }
//     else{
//       setIsModalVisible(true);
//     }
//   }
// };

// export const registerWithGoogle = async (
//   googleId: string,
//   role: string,
//   additionalFields: {
//     description: string;
//     phone_number: string;
//     video: string;
//   },
//   navigate: ReturnType<typeof useNavigate>
// ) => {
//   await axiosInstance.post(API_REGISTER_WITH_GOOGLE, {
//     google_id: googleId,
//     role: role,
//     ...additionalFields,
//   });
//   const responseLogin = await axiosInstance.post(API_LOGIN_WITH_GOOGLE, {
//     google_id: googleId,
//   });
//   localStorage.setItem("token", responseLogin.data.token);
//   const currentUser = await axiosInstance.get(API_CURRENT_LOGIN_USER);
//   localStorage.setItem("user", JSON.stringify(currentUser.data));
//   message.success("Registered and logged in successfully");
//   navigate(paths.HOME);
// };


export const handleNavigateRole = async (navigate: ReturnType<typeof useNavigate>) => {
  const response = await BaseService.get({url: API.GET_CURRENT_LOGIN_USER});
  const user = response.data;
  console.log(response);
  localStorage.setItem("user", JSON.stringify(user));
    switch (user.role) {
      case roles.CUSTOMER:
        navigate(PATH.HOME);
        break;
      case roles.MANAGER:
        navigate(PATH.MANAGER_HOME);
        break;
      case roles.ADMIN:
        navigate(PATH.ADMIN_HOME);
        break;
      default:
        navigate(PATH.HOME);
        break;
    }
    message.success("Login successfully");
};

export const getCurrentLoginUser = async (token: string) => {
  const response = await BaseService.get({url: API.GET_CURRENT_LOGIN_USER});
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(response.data));
};

export const logout = ( navigate: ReturnType<typeof useNavigate>) => {
  const user: User = getUserFromLocalStorage();
  if (user.role === roles.ADMIN) {
    navigate(PATH.ADMIN_LOGIN);
  }
  else {
    navigate(PATH.HOME);
  }
  message.info("You logout from the system");
  const courseInWishList = localStorage.getItem("courseInWishList");
  localStorage.clear();
  if (courseInWishList) {
    localStorage.setItem("courseInWishList", courseInWishList);
  }
};
