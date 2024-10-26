import { API } from "../consts";
import { BaseService } from "./BaseService";

export const getCategoriesByClient = async (keyword: string = "", pageNum: number, pageSize: number) => {
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


export const getBlogsByClient = async (category_id: string = "", pageNum: number, pageSize: number) => {
  try {
    const response = await BaseService.post({
      url: API.CLIENT_GET_BLOGS, payload: {
        "searchCondition": {
          "category_id": category_id,
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

export const getKitsByClientService = async (category_id: string, keyword: string, status: string, pageNum: number, pageSize: number) => {
  try {
    const response = await BaseService.post({
      url: API.CLIENT_GET_KITS, payload: {
        "searchCondition": {
          "category_id": category_id || "",
          "keyword": keyword || "",
          "status": status || "",
          "is_deleted": false
        },
        "pageInfo": {
          "pageNum": pageNum || 1,
          "pageSize": pageSize || 100
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


export const getKitByClientService = async (id: string, pageNum:number, pageSize:number) => {
  try {
    const response = await BaseService.get({ url: `${API.CLIENT_GET_KIT}/${id}` })
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