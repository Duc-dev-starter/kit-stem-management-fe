import { API } from "../consts"
import { Lab } from "../models/Kit";
import { BaseService } from "./BaseService"


export const getLabs = async (
  keyword: string = "",
  category_id: string = "",
  status: string = "",
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await BaseService.post({
      url: API.GET_LABS, payload: {
        "searchCondition": {
          "keyword": keyword || "",
          "category_id": category_id || "",
          "status": status || "",
          "is_deleted": is_deleted || false
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
}
//Get All LAB
export const createLab = async (labData: Lab) => {
  const response = await BaseService.post({ url: API.CREATE_LAB, payload: labData });
  return response;
}
//Update LAB
export const updateLab = async (id: string, labData: Lab) => {
  const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_LAB}/${id}`, payload: labData });
  return response;
}
//Delete LAB
export const deleteLab = async (id: string) => {
  const response = await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_LAB}/${id}` });
  return response;
}

//Get LAB detail
export const getLabDetail = async (id: string, labData: Lab) => {
  const response = await BaseService.get({ url: `${API.GET_LAB}/${id}`, payload: labData });
  return response;
}

//Add Supporter 
export const AddSupporters = async (labId: string, supporterIds: supporterIds) => {
  const response = await BaseService.post({ url: `${API.ADD_SUPPORTERS}`, payload: { labId, supporterIds } });
  return response;
}

//Add Supporter 
export const RemoveSupporters = async (labId: string, supporterIds: supporterIds) => {
  const response = await BaseService.post({ url: `${API.REMOVE_SUPPORTERS}`, payload: { labId, supporterIds } });
  return response;
}

export interface supporterIds {
  id: string[];
}