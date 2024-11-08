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
export const getLabDetail = async (id: string) => {
  const response = await BaseService.get({ url: `${API.GET_LAB}/${id}` });
  return response;
}

//Add Supporter 
export const AddSupporters = async (labId: string, supporterIds: string[]) => {
  const response = await BaseService.post({ url: `${API.ADD_SUPPORTERS}`, payload: { labId, supporterIds } });
  return response;
}

//Add Supporter 
export const RemoveSupporters = async (labId: string, supporterIds: string []) => {
  const response = await BaseService.post({ url: `${API.REMOVE_SUPPORTERS}`, payload: { labId, supporterIds } });
  return response;
}

export interface ApiRequestModel {
  url: string;
  payload?: any;
  headers?: any;
  responseType?: string;  // Thêm thuộc tính này để hỗ trợ responseType
}export const downloadPDF = async (labId: string) => {
  try {
    const response = await BaseService.get({
      url: `${API.DOWNLOAD_PDF}/${labId}`,
      headers: { 'Accept': 'application/pdf' },
      responseType: 'blob',
    });

    console.log('Response headers:', response.headers);
    console.log('Response data:', response.data);  // Kiểm tra dữ liệu trả về

    if (!response.data || !(response.data instanceof Blob)) {
      throw new Error('Invalid PDF response from server');
    }

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lab_${labId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    console.error('Error downloading PDF:', error.message || error);  // Hiển thị chi tiết lỗi
  }
};


export interface supporterIds {
  id: string[];
}