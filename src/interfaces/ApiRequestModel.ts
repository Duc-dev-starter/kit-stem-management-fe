export default interface ApiRequestModel {
    url: string;
    payload?: any;
    headers?: object;
    isLoading?: boolean;
    responseType?: 'json' | 'blob' | 'arraybuffer' | 'text' | 'document'; // Bạn có thể thêm các loại cần thiết
}