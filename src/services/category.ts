
import { message } from "antd";
import { API } from "../consts";
import { BaseService } from "./BaseService";
import { Category } from "../models";

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
export const createCategory = async(categoryData: Category) => {
  const response = await BaseService.post({url: API.CREATE_CATEGORY, payload: categoryData});
  return response;
}

export const updateCategory = async (id: string, name: string,updateCategory: Category) => {
  await BaseService.put({url: `${API.GET_UPDATE_DELETE_CATEGORY}/${id}`, payload: updateCategory});
  message.success(`Category ${name} updated successfully.`);
}

export const deleteCategory = async (id: string, name: string, dataCategories: Category[],fetchCategories: () => Promise<void>) => {
  const isParentCategory = dataCategories.some(
    (category) => category.parent_category_id === id
  );
  if (isParentCategory) {
    message.error(`Cannot delete category ${name} as it is a parent category of another category.`);
    return;
  }
  await BaseService.delete({url: `${API.GET_UPDATE_DELETE_CATEGORY}/${id}`});
  message.success(`Category ${name} deleted successfully.`);
  fetchCategories();
}
