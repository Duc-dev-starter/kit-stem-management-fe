
import { API } from "../consts";
import { BaseService } from "./BaseService";

export const getCategories = async (keyword: string = "", is_deleted : boolean = false, pageNum: number = 1, pageSize: number = 100) => {
    try {
      const response = await BaseService.post({url: API.GET_CATEGORIES, payload: {
        "searchCondition": {
          "keyword": keyword,
          "is_deleted": is_deleted
      },
      "pageInfo": {
          "pageNum": pageNum,
          "pageSize": pageSize
      }
      }})
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