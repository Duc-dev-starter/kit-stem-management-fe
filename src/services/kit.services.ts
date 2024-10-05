import { API } from "../consts";
import { Kit } from "../models";
import { BaseService } from "./BaseService";
// Get all KITs
export const getKits = async (
  keyword: string = "",
  category_id: string = "",
  status: string = "",
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 100
) => {
  try {
    const response = await BaseService.post({
      url: API.GET_KITS, payload: {
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
      }
    })
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
//Create KIT
export const createKIT = async (kitData: Kit) => {
  const response = await BaseService.post({ url: API.CREATE_KIT, payload: kitData });
  return response;
}
//Update KIT
export const updateKit = async (id: string, values: Kit) => {
  const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_KIT}/${id}`, payload: values });
  return response;
}
//Delete KIT
export const deleteKit = async (id: string, values:Kit) => {
  const response = await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_KIT}/${id}`, payload: values  });
  return response;
}

//Get KIT detail
export const getKitDetail = async (id: string, values:Kit) => {
  const response = await BaseService.get({ url: `${API.GET_KIT}/${id}`, payload: values  });
  return response;
}

//Change KIT status
export const changeKitStatus = async (id: string, status:string, comment: string) => {
  const response = await BaseService.put({ url: `${API.CHANGE_STATUS_KIT}/${id}`, payload: {status, comment} });
  return response;
}


