import { API } from "../consts";
import axiosInstance from "./axiosInstance"
export interface KitValues {
    keyword?: string | undefined,
    category_id?: string | undefined,
    status?: string | undefined,
    pageNum?: number | 1,
    pageSize?: number | 100
}

export const getAllKitsFromManager = async (values?: KitValues) => {
    try {
        console.log(API.GET_KITS)
        const res = await axiosInstance.post(`${API.GET_KITS}`,
            {
                "searchCondition": {
                    "keyword": values?.keyword,
                    "category_id": values?.category_id,
                    "status": values?.status,
                    "is_deleted": false
                },
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 100
                }
            }
        )
        console.log(res);
        return res;
    } catch (error) {
        console.log("getAllKitsFromManager-error:", error)
        return [];
    }
}