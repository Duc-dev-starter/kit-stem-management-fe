export const PATH = {
  /* GUEST PATHS */
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  REGISTER: "/register",
  TERMS: "/terms",
  POLICY: "/terms/policy",
  GUIDELINES: "/terms/guidelines",
  SUPPORT: "/support",
  BLOGS: "/blogs",
  BLOG_DETAIL: "/blog/:id",
  CONTACT: "/contact",
  TEACHING: "/teaching",
  NAME_CATEGORY: "/category",
  SITEMAP: "/sitemap",
  NOTFOUND: "/notfound",
  COURSE_DETAILS: "/course/:_id",
  COURSE_DETAIL: "/course/:id",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_TOKEN: "/verify-email/:token",
  USER_DETAIL: "/user/:id",
  INTERNAL_SERVER_ERROR: "/internal-server-error",
  CHANGE_PASSWORD: "/change-password",
  KIT_SHOP: "/kit-shop",
  LAB_SHOP: "/lab-shop",
  COMBO_SHOP: "/combo-shop",
  CLIENT_KIT_DETAIL: "/kit/:id",
  CLIENT_LAB_DETAIL: "/lab/:id",
  CLIENT_COMBO_DETAIL: "/combo/:id",
  BLOG_PAGE: "/blog",
  USER_PROFILE: "/profile",
  CHECKOUT: "/check-out",
  PURCHASE: "/purchase",
  //Customer
  CUSTOMER: '/customer/*',
  CUSTOMER_PROFILE: "/profile",
  CUSTOMER_CHANGE_PASSWORD: "/change-password",
  //Staff
  STAFF: '/staff/*',
  STAFF_LOGIN: '/manager/login',
  STAFF_HOME: 'dashboard',
  STAFF_DELIVERY: 'delivery',
  STAFF_DASHBOARD: '/staff/dashboard',
  //Manager
  MANAGER: '/manager/*',
  MANAGER_LOGIN: '/manager/login',
  MANAGER_HOME: 'dashboard',
  MANAGER_MANAGE_SUPPORTER: "manage-lab/:_id/manage-supporters",
  MANAGER_MANAGE_KIT: "/manager/manage-kits",
  MANAGER_KIT_DELIVERY_DETAIL: "manage-kit-delivery-detail",
  MANAGER_KIT_DELIVERY: "manage-kit-delivery",
  MANAGER_LAB: "manage-labs",
  MANAGER_KIT: "manage-kits",
  MANAGER_KIT_ID: "manage-kit/:id",
  MANAGER_USER: "manage-users",
  MANAGER_DASHBOARD: "/manager/dashboard",
  MANAGER_MANAGE_COMBO: 'manage-combos',
  MANAGER_MANAGE_PURCHASE: 'manage-purchases',
  //admin
  ADMIN: '/admin/*',
  ADMIN_LOGIN: "/admin/login",
  ADMIN_HOME: "dashboard",
  ADMIN_MANAGE_USER: 'manage-users',
  ADMIN_MANAGE_BLOG: 'manage-blogs',
  ADMIN_MANAGE_CATEGORY: 'manage-categories',
  ADMIN_DASHBOARD: "/admin/dashboard",
  /* IMG */
  AVATAR:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PyKYrBKAWWy6YCbQzWQcwIRqH8wYMPluIZiMpV1w0NYSbocTZz0ICWFkLcXhaMyvCwQ&usqp=CAU",
};