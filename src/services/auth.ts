import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {API, PATH} from "../consts";
import {User} from "../models";
import { message } from "antd";
import { BaseService } from '../services';
import {JwtPayload} from '../interfaces'
import { getUserFromLocalStorage } from "../utils";
import { roles, rolesArr } from "../enum";


export const login = async (email: string, password: string) => {
  const response = await BaseService.post({
    url: API.LOGIN,
    payload: { email, password },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!response.success) {
    return;
  }
  const token = response.data.token;
  const decodedToken: JwtPayload = jwtDecode(token);
  const userRole = decodedToken.role;
  if (!rolesArr.includes(userRole)) {
    message.error("Invalid user role");
    return null;
  }

  const currentPath = window.location.pathname;


  if (currentPath.includes("/admin") && userRole !== roles.ADMIN) {
    message.error("You don't have permission to access this page");
    return null;
  }
  else if (currentPath.includes("/manager") && userRole !== roles.MANAGER) {
    message.error("You don't have permission to access this page");
    return null;
  }
  
  else if (currentPath.includes("/staff") && userRole !== roles.STAFF) {
    message.error("You don't have permission to access this page");
    return null;
  }

  // const handleWrongPathLogin = (correctPath: string) => {
  //   message.error(`You login wrong path. Navigate in 2s`);
  //   setTimeout(() => {
  //     window.location.href = correctPath;
  //   }, 2000);
  //   return null;
  // };

  // if (currentPath.includes("/admin")) {
  //   // Đã xử lý ở trên: nếu không phải admin vào trang admin
  // } else if ([roles.ADMIN, roles.MANAGER, roles.STAFF].includes(userRole)) {
  //   if (userRole === roles.ADMIN) {
  //     return handleWrongPathLogin(PATH.ADMIN_LOGIN);
  //   } else if (userRole === roles.MANAGER) {
  //     return handleWrongPathLogin(PATH.MANAGER_LOGIN);
  //   } else {
  //     return handleWrongPathLogin(PATH.STAFF_LOGIN);
  //   }
  // }

  return { token };
};


export const loginWithGoogle = async (googleId: string, navigate: ReturnType<typeof useNavigate>) => {
  try {
    const responseLogin = await BaseService.post({url: API.LOGIN_WITH_GOOGLE, payload: {google_id: googleId}});
    localStorage.setItem("token", responseLogin.data.token);
    const currentUser = await BaseService.get({url: API.GET_CURRENT_LOGIN_USER});
    localStorage.setItem("user", JSON.stringify(currentUser.data));
    message.success("Login successfully");
    navigate(PATH.HOME);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if(error.message === "Your account has been locked. Please contact admin via mail to activate!"){
      return;
    }
  }
};



export const handleNavigateRole = async (token: string, navigate: ReturnType<typeof useNavigate>) => {
  localStorage.setItem('token', token);
  const response = await BaseService.get({url: API.GET_CURRENT_LOGIN_USER});
  const user = response.data;
  localStorage.setItem("user", JSON.stringify(user));
    switch (user.role) {
      case roles.CUSTOMER:
        navigate(PATH.HOME);
        break;
      case roles.MANAGER:
        navigate(PATH.MANAGER_DASHBOARD);
        break;
      case roles.ADMIN:
        navigate(PATH.ADMIN_DASHBOARD);
        break;
      case roles.STAFF: 
      navigate(PATH.STAFF_DASHBOARD);
      break;
      default:
        navigate(PATH.HOME);
        break;
    }
    message.success("Login successfully");
};

export const getCurrentLoginUser = async () => {
  const response = await BaseService.get({url: API.GET_CURRENT_LOGIN_USER});
  localStorage.setItem("user", JSON.stringify(response.data));
};

export const logout = async ( navigate: ReturnType<typeof useNavigate>)=>  {
  await BaseService.get({url: API.LOGOUT});
  const user: User = getUserFromLocalStorage();
  switch(user.role) {
    case roles.MANAGER:
      navigate(PATH.MANAGER_LOGIN)
      break;
      case roles.STAFF:
      navigate(PATH.STAFF_LOGIN)
      break;
      case roles.ADMIN:
      navigate(PATH.ADMIN_LOGIN)
      break;
      default:
      navigate(PATH.LOGIN);
  }
  message.info("You logout from the system");
  const kitInWishList = localStorage.getItem("kitInWishList");
  const labInWishList = localStorage.getItem("labInWishList");
  localStorage.clear();
  if (kitInWishList) {
    localStorage.setItem("kitInWishList", kitInWishList);
  }
  if(labInWishList){
    localStorage.setItem("labInWishList", labInWishList);
  }
};
