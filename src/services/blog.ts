import { useNavigate } from "react-router-dom";
// import { API_DELETE_BLOG, API_CLIENT_GET_BLOGS } from "../consts";
import axiosInstance from "./axiosInstance";
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
    console.log(response)
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

export const deleteBlog = async (id: string, title: string, getBlogs: () => Promise<void>) => {
    await axiosInstance.delete(`${''}/${id}`);
    message.success(`Deleted blog ${title} successfully`);
    await getBlogs();
  };

export const handleGetBlogDetail = (_id: string, navigate: ReturnType<typeof useNavigate>) => {
    navigate(`/blog/${_id}`);
};