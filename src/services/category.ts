
import axiosInstance from "./axiosInstance"

export const getCategories = async (keyword: string = "", is_deleted : boolean = false, pageNum: number = 1, pageSize: number = 100) => {
    try {
        const response = await axiosInstance.post('', 
            {
                "searchCondition": {
                    "keyword": keyword,
                    "is_deleted": is_deleted
                },
                "pageInfo": {
                    "pageNum": pageNum,
                    "pageSize": pageSize
                }
            }
        
        )
            return response;
        } catch (error) {
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