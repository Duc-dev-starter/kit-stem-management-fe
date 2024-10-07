import { API } from "../consts";
import { BaseService } from "./BaseService";

export const getCategoriesByClient = async (keyword: string ="", pageNum: number, pageSize: number) => {
    try {
      const response = await BaseService.post({
        url: API.CLIENT_GET_CATEGORIES, payload: {
          "searchCondition": {
            "keyword": keyword,
            "is_deleted": false
          },
          "pageInfo": {
            "pageNum": pageNum,
            "pageSize": pageSize
          }
        }
      })
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
  };