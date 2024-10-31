import { API } from "../consts";
import { BaseService } from "./BaseService";

interface ComboValues {
  name: string;
  kitId: string;
  labId: string;
  price: number;
  discount: number;
  quantity: number;
  description: string;
  category_id: string;
  image_url: string
}


export const getCombosByClientService = async (category_id: string, keyword: string, pageNum: number, pageSize: number) => {
  try {
    const response = await BaseService.post({
      url: API.GET_COMBOS, payload: {
        "searchCondition": {
          "category_id": category_id || "",
          "keyword": keyword || "",
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

export const createComboService = async (values: ComboValues) => {
  try {
    const response = await BaseService.post({
      url: API.CREATE_COMBO,
      payload: {
        name: values.name,
        items: [
          { itemType: "kit", itemId: values.kitId },
          { itemType: "lab", itemId: values.labId }
        ],
        quantity: values.quantity,
        price: values.price,
        discount: values.discount,
        description: values.description,
        category_id: values.category_id,
        image_url: values.image_url
      }
    });
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


export const editComboService = async (values: ComboValues, id: string) => {
  try {
    const response = await BaseService.put({
      url: `${API.EDIT_COMBO}/${id}`,
      payload: {
        name: values.name,
        items: [
          { itemType: "kit", itemId: values.kitId },
          { itemType: "lab", itemId: values.labId }
        ],
        price: values.price,
        discount: values.discount,
        description: values.description,
        category_id: values.category_id,
        image_url: values.image_url,
        quantity: values.quantity
      }
    });
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