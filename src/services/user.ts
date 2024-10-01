import { message } from 'antd';
import { API } from '../consts';
import { BaseService } from './BaseService';
import { User, UserRole } from '../models';
import { ValuesChangePassword } from '../interfaces';
import { getUserFromLocalStorage } from '../utils';
export const user = getUserFromLocalStorage();

export const getUsers = async (
    keyword: string = "",
    role: string = "all",
    status: boolean = true,
    is_deleted: boolean = false,
    pageNum: number = 1,
    pageSize: number = 10
) => {
        try {
            const response = await BaseService.post({url: API.GET_USERS ,payload:  {
                searchCondition: {
                  keyword: keyword || "",
                  role: role || "all",
                  status: status !== undefined ? status : true,
                  is_deleted: is_deleted !== undefined ? is_deleted : false,
                },
                pageInfo: {
                  pageNum: pageNum || 1,
                  pageSize: pageSize || 10,
                },
              }});
            return response;
          } catch (error) {
            console.log(error);
            return {
              data: {
                pageInfo: {
                  totalItems: 0,
                  pageNum,
                  pageSize
                },
                pageData: []
              }
            };
          }
    }

export const getUserDetail = async (_id: string) => {
  const response = await BaseService.get({url: `${API.GET_UPDATE_DELETE_USER}/${_id}`});
    return response;
};

export const createUser = async (userData: User) => {
  const response = await BaseService.post({url: API.CREATE_USER, payload: userData});
  message.success("Created new user successfully");
  return response;
}
      
export const changePassword = async (values: ValuesChangePassword) => {
  const response = await BaseService.put({url: API.CHANGE_PASSWORD, payload:{
      user_id: user._id,
      old_password: values.oldPassword,
      new_password: values.newPassword,
  }});
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (response.success) {
        message.success("Change password successfully");
      }
};
      
      export const deleteUser = async (_id: string, email: string, fetchUsers: () => Promise<void>) => {
        await BaseService.delete({url: `${API.GET_UPDATE_DELETE_USER}/${_id}`});
        message.success(`Deleted user ${email} successfully`);
        await fetchUsers();
      };
      
      export const changeStatusUser = async (
        checked: boolean,
        userId: string,
        updateUserData: (userId: string, status: boolean) => void
      ) => {
        await BaseService.put({url: API.CHANGE_STATUS_USERS, payload: {
            user_id: userId,
            status: checked,
          }});
        updateUserData(userId, checked);
        message.success(`User status updated successfully`);
      };
      
      export const changeUserRole = async (userId: string, role: UserRole) => {
        await BaseService.put({url: API.CHANGE_ROLE, payload: {
            user_id: userId,
            role,
          }});
        message.success(`Role changed successfully`);
      };

export const updateUser = async (id: string, updateData: User) => {
    await BaseService.put({url: `${API.GET_UPDATE_DELETE_USER}/${id}`, payload: updateData});
    message.success("User updated successfully");
}
      