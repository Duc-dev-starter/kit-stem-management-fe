import { Route, Routes } from "react-router-dom"
import {
    AboutPage, AdminManageBlogs, KitDetail, AdminManageCategories, AdminManageUsers, HomePage, Login, ManageKit,
    ManageKitDelivery, ManageKitDeliveryDetail, ManageLab, ManagerDashboard, ManageUser, Register, AdminLoginPage,
    InternalServerError,
    Terms,
    AdminDashboard,
    NotFound
} from "../pages"
import { PATH } from "../consts"
import { Dashboard } from "../layout"

const AppRouter = () => {
    return (
        <Routes>
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route path={PATH.ABOUT} element={<AboutPage />} />
            <Route path={PATH.TERMS} element={<Terms />} />
            <Route path={PATH.INTERNAL_SERVER_ERROR} element={<InternalServerError />} />

            <Route path={PATH.STAFF_LOGIN} element={<AdminLoginPage />} />
            <Route path={PATH.STAFF} element={<Dashboard />}>
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path={PATH.MANAGER_LOGIN} element={<AdminLoginPage />} />
            <Route path={PATH.MANAGER} element={<Dashboard />}>
                {/* <Route path="manager-page" element={<ManagerPage />} /> */}
                <Route path={PATH.MANAGER_HOME} element={<ManagerDashboard />} />
                <Route path={PATH.MANAGER_USER} element={<ManageUser />} />
                <Route path={PATH.MANAGER_KIT} element={<ManageKit />} />
                <Route path={PATH.MANAGER_KIT_ID} element={<KitDetail />} />
                <Route path={PATH.MANAGER_LAB} element={<ManageLab />} />
                <Route path={PATH.MANAGER_KIT_DELIVERY} element={<ManageKitDelivery />} />
                <Route path={PATH.MANAGER_KIT_DELIVERY_DETAIL} element={<ManageKitDeliveryDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={PATH.ADMIN_LOGIN} element={<AdminLoginPage />} />
            <Route path={PATH.ADMIN} element={<Dashboard />}>
                <Route path={PATH.ADMIN_HOME} element={<AdminDashboard />} />
                <Route path={PATH.ADMIN_MANAGE_USER} element={<AdminManageUsers />} />
                <Route path={PATH.ADMIN_MANAGE_BLOG} element={<AdminManageBlogs />} />
                <Route path={PATH.ADMIN_MANAGE_CATEGORY} element={<AdminManageCategories />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter
