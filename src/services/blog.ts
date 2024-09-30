import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { BaseService } from "./BaseService";
import { API } from "../consts";


export const getBlogs = async (
  category_id: string = "",
  is_deleted: boolean = false,
  pageNum: number = 1,
  pageSize: number = 10
  ) => {
  try {
    const response = await BaseService.post({url: API.GET_BLOGS, payload: {
      "searchCondition": {
        "category_id": category_id || "",
        "is_deleted": is_deleted !== undefined ? is_deleted : false,
      },
      "pageInfo": {
        "pageNum": pageNum || 1,
        "pageSize": pageSize || 100
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

export const deleteBlog = async (id: string, title: string, fetchBlogs: () => Promise<void>) => {
    await BaseService.delete({url: `${API.GET_UPDATE_DELETE_BLOG}/${id}`});
    message.success(`Deleted blog ${title} successfully`);
    await fetchBlogs();
  };

export const handleGetBlogDetail = (_id: string, navigate: ReturnType<typeof useNavigate>) => {
    navigate(`/blog/${_id}`);
};