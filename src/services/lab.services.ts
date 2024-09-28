import {  API_GET_LABS } from "../api"
import axiosInstance from "./axiosInstance"
export interface LabValues {
    keyword?: string | undefined,
    category_id?: string | undefined,
    status?: string | undefined,
    pageNum?: number | 1,
    pageSize?: number | 100
}

export const getAllLabsFromManager = async (values?: LabValues) => {
    try {
        const res = await axiosInstance.post(`${API_GET_LABS}`,
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
        return res;
    } catch (error) {
        console.log("getAllKitsFromManager-error:", error)
        return [];
    }
}