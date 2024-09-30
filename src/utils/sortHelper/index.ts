import { AxiosResponse } from "axios";
import { User } from "../../models";

export const sortUsers = async(responseUsers: AxiosResponse) => {
        responseUsers.data.pageData.sort((a: User, b: User) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
}