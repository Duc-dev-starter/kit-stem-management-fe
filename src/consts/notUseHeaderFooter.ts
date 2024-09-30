import { PATH } from "./path";
import { roles } from "./role";

export const isNotUseHeaderFooter =
window.location.pathname.includes(roles.ADMIN) ||
window.location.pathname.includes(roles.STAFF) ||
window.location.pathname.includes(roles.MANAGER) ||
window.location.pathname.includes(PATH.LOGIN) ||
window.location.pathname.includes(PATH.REGISTER)