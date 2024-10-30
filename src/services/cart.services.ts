
import { API } from "../consts";
import { BaseService } from "./BaseService";
import { Category } from "../models";

export const getCartsService = async (product_id: string = "",status: string = "") => {
    try {
        const response = await BaseService.post({
            url: API.GET_CART, payload: {
                "searchCondition": {
                    "product_id": product_id,
                    "status": status,
                    "is_deleted": false
                },
                "pageInfo": {
                    "pageNum": 1,
                    "pageSize": 100
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
                    pageNum:1,
                    pageSize:100
                },
                pageData: []
            }
        };
    }
};

export const createCartSerivce = async (id: string, type: string) => {
    const response = await BaseService.post({ url: API.CREATE_CART, payload: { product_id: id, product_type: type } });
    return response;
}

export const updateCategory = async (id: string, name: string, updateCategory: Category) => {
    const response = await BaseService.put({ url: `${API.GET_UPDATE_DELETE_CATEGORY}/${id}`, payload: updateCategory });
    return response;
}

export const deleteCartService = async (id: string ) => {
    const response = await BaseService.delete({ url: `${API.DELETE_CART}/${id}` });
    return response;
}
