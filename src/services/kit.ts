import { API } from "../consts";
import { BaseService } from "./BaseService";

export const getKits = async (
    keyword: string = "",
    category_id: string = "",
    status: string = "",
    is_deleted: boolean = false,
    pageNum: number = 1,
    pageSize: number = 10
) => {
    try {
        const response = await BaseService.post({url: API.GET_KITS, payload: {
                "searchCondition": {
                    "keyword": keyword || "",
                    "category_id": category_id || "",
                    "status": status || "",
                    "is_deleted": is_deleted !== undefined ? is_deleted : false,
                },
                "pageInfo": {
                    "pageNum": pageNum || 1,
                    "pageSize": pageSize || 10
                }
        }})
        console.log(response);
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