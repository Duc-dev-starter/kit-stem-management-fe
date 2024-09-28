
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH, roles } from "../consts";
import { getUserFromLocalStorage } from "../utils";

const useRoleRedirect = () => {
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.role) {
      redirectBasedOnRole();
    }
    // if(user.google_id){
    //   if(location.pathname.includes(paths.STUDENT_CHANGEPASSWORD)){
    //     navigate(paths.LOGIN)
    //   }
    // }
  }, [user.role, location.pathname]);
  

  const redirectBasedOnRole = () => {
    const path = location.pathname;

    switch (user.role) {
      case roles.CUSTOMER:
        if (path.includes("/manager") || path.includes("/admin") || path.includes(PATH.LOGIN) || path.includes(PATH.REGISTER) || path.includes(PATH.FORGOT_PASSWORD)) {
          navigate(PATH.HOME);
        }
        break;
      case roles.ADMIN:
        if (!path.includes("/admin") || path.includes(PATH.LOGIN) || path.includes(PATH.REGISTER) || path.includes(PATH.FORGOT_PASSWORD)) {
          navigate(PATH.ADMIN_HOME);
        }
        break;
      case roles.MANAGER:
        if (!path.includes("/manager")|| path.includes(PATH.LOGIN) || path.includes(PATH.REGISTER) || path.includes(PATH.FORGOT_PASSWORD)) {
          navigate(PATH.MANAGER_HOME);
        }
        break;
      default:
        navigate(PATH.HOME);
        break;
    }
  };

  const canAccess = (allowedRoles: string[]) => {
    return user.role && allowedRoles.includes(user.role);
  };

  return { canAccess };
};

export default useRoleRedirect;
