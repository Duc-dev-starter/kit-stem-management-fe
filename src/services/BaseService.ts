import { AxiosResponse } from "axios";
import { store } from "../store";
import { hideLoading, showLoading } from "../store/loadingSlice";
import { axiosInstance } from "./axiosInstance";
import { ApiRequestModel } from "../interfaces"


export const BaseService = {
    async get<T = any>({ url, payload, headers }: ApiRequestModel): Promise<AxiosResponse<T>> {
        if (!url) {
            throw new Error("URL is required for PUT request");
        }
        store.dispatch(showLoading());  
        try {
            const params = { ...payload };
            for (const key in params) {
                if ((params as any)[key] === '' && (params as any)[key] !== 0) {
                    delete (params as any)[key];
                }
            }
            const response = await axiosInstance.get<T, AxiosResponse<T>>(url, {
                params: params,
                headers: headers || {},
            });
            return response;
        } finally {
            store.dispatch(hideLoading());  
        }
    },

    async post<T = any>({ url, payload, headers }: ApiRequestModel): Promise<AxiosResponse<T>> {
        if (!url) {
            throw new Error("URL is required for PUT request");
        }
        store.dispatch(showLoading());
        try {
            const response = await axiosInstance.post<T, AxiosResponse<T>>(url, payload, {
                headers: headers || {},
            });
            return response;
        } finally {
            store.dispatch(hideLoading());
        }
    },
    async put<T = any>({ url, payload, headers }: ApiRequestModel): Promise<AxiosResponse<T>> {
        if (!url) {
            throw new Error("URL is required for PUT request");
        }
        store.dispatch(showLoading()); 
        try {
            const response = await axiosInstance.put<T, AxiosResponse<T>>(url, payload, {
                headers: headers || {},
            });
            return response;
        } finally {
            store.dispatch(hideLoading()); 
        }
    },
    
    async delete<T = any>({ url, payload, headers }: ApiRequestModel): Promise<AxiosResponse<T>> {
        if (!url) {
            throw new Error("URL is required for DELETE request");
        }
        store.dispatch(showLoading()); 
        try {
            const params = { ...payload };
            for (const key in params) {
                if ((params as any)[key] === '' && (params as any)[key] !== 0) {
                    delete (params as any)[key];
                }
            }
            const response = await axiosInstance.delete<T, AxiosResponse<T>>(url, {
                params: params,
                headers: headers || {},
            });
            return response;
        } finally {
            store.dispatch(hideLoading());  
        }
    }
    ,

    async getById<T = any>({ url, id, headers }: { url: string; id: string | number; headers?: any }): Promise<AxiosResponse<T>> {
        store.dispatch(showLoading()); 
        try {
            const response = await axiosInstance.get<T, AxiosResponse<T>>(`${url}/${id}`, {
                headers: headers || {},
            });
            return response;
        } finally {
            store.dispatch(hideLoading()); 
        }
    }
}