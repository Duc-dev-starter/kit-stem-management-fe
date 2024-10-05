
export const API = {
    //AUTH
    LOGIN: "/api/auth/login",
    GET_CURRENT_LOGIN_USER: "/api/auth",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    LOGOUT: "/api/auth/logout",
    LOGIN_WITH_GOOGLE: "/api/auth/google",

    //USERS
    REGISTER: "/api/users/register",
    GET_UPDATE_DELETE_USER: "/api/users",
    CREATE_USER: "/api/users/create",
    CHANGE_PASSWORD: "/api/users/change-password",
    CHANGE_ROLE: "/api/users/change-role",
    CHANGE_STATUS_USERS: "/api/users/change-status",
    GET_USERS: "/api/users/search",
    REGISTER_WITH_GOOGLE: "/api/users/google",

    //CATEGORY
    CREATE_CATEGORY: "/api/category/create",
    GET_CATEGORIES: "/api/category/search",
    GET_UPDATE_DELETE_CATEGORY: "/api/category",

    //BLOG
    CREATE_BLOG: "/api/blog/create",
    GET_BLOGS: "/api/blog/search",
    GET_UPDATE_DELETE_BLOG: "/api/blog",

    //KIT
    CREATE_KIT: "/api/kit/create",
    GET_KITS: "/api/kit/search",
    GET_KIT: "/api/kit",
    GET_UPDATE_DELETE_KIT : "/api/kit",
    CHANGE_STATUS_KIT: "/api/kit/change-status",

    //LAB
    CREATE_LAB: "/api/lab/create",
    GET_LAB: "/api/lab",
    GET_UPDATE_DELETE_LAB : "/api/lab",
    GET_LABS : "/api/lab/search",
    CHANGE_STATUS_LAB: "/api/lab/change-status",
    ADD_SUPPORTERS: "/api/lab/add-supporter",
    REMOVE_SUPPORTERS: "/api/lab/remove-supporter",

    //CLIENT
    CLIENT_GET_CATEGORIES: "/api/client/category/search",
    CLIENT_GET_BLOGS: "/api/client/blogs",
    CLIENT_GET_BLOG: "/api/client/blog"
}