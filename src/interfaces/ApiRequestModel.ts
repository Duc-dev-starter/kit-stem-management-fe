export default interface ApiRequestModel {
    url: string;
    payload?: any;
    headers?: object;
    isLoading?: boolean;
}