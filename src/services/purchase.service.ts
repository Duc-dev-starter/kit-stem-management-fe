import { message } from "antd";
import { BaseService } from "./BaseService";

// Get all 
export const staffGetPurchase = async (
    purchase_no: string = "",
    cart_no: string = "",
    product_id: string = "",
    product_type: string = "",
    status: string = "",
    staff_id: string = "",
    is_deleted: boolean = false,
    pageNum: number = 1,
    pageSize: number = 100
  ) => {
    try {
      const response = await BaseService.post({
        url: '/api/purchase/delivery', payload: {
          "searchCondition": {
            "purchase_no": purchase_no || "",
            "cart_no": cart_no || "",
            "status": status || "",
            "product_id": product_id || "",
            "product_type": product_type || "",
            "staff_id": staff_id || "",
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

export const updatePurchase = async (purchase_ids: string[] = [], status: string= '', staff_id: string = '') => {
    await BaseService.put({url: '/api/purchase/update-status', payload: {
            "status": status || '',
            "staff_id": staff_id || '',
            "purchase_ids": purchase_ids || []
        
    }})
    message.success('Updated status successfully')
}