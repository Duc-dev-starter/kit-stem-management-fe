
import { message } from "antd";
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

export const deleteCategory = async (id: string, name: string, dataCategories: Category[], fetchCategories: () => Promise<void>) => {
    const isParentCategory = dataCategories.some(
        (category) => category.parent_category_id === id
    );
    if (isParentCategory) {
        message.error(`Cannot delete category ${name} as it is a parent category of another category.`);
        return;
    }
    await BaseService.delete({ url: `${API.GET_UPDATE_DELETE_CATEGORY}/${id}` });
    message.success(`Category ${name} deleted successfully.`);
    fetchCategories();
}
