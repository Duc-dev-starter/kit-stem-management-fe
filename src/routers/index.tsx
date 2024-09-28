import { Route, Routes } from "react-router-dom"
import {
    AboutPage, AdminManageBlogs, KitDetail, AdminManageCategories, AdminManageUsers, HomePage, Login, ManageKit,
    ManageKitDelivery, ManageKitDeliveryDetail, ManageLab, ManagerDashboard, ManageUser, Register, AdminLoginPage,
    NotFound,
    InternalServerError,
    Terms
} from "../pages"
import AdminDashboard from "../pages/admin/dashboard"
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

            <Route path="/manager/*" element={<Dashboard />}>
                {/* <Route path="manager-page" element={<ManagerPage />} /> */}
                <Route path="dashboard" element={<ManagerDashboard />} />
                <Route path="manage-user" element={<ManageUser />} />
                <Route path="manage-kit" element={<ManageKit />} />
                <Route path="manage-kit/:id" element={<KitDetail />} />
                <Route path="manage-lab" element={<ManageLab />} />
                <Route path="manage-kit-delivery" element={<ManageKitDelivery />} />
                <Route path="manage-kit-delivery-detail" element={<ManageKitDeliveryDetail />} />
            </Route>
            <Route path={PATH.ADMIN_LOGIN} element={<AdminLoginPage />} />
            <Route path="/admin/*" element={<Dashboard />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-users" element={<AdminManageUsers />} />
                <Route path="manage-blogs" element={<AdminManageBlogs />} />
                <Route path="manage-categories" element={<AdminManageCategories />} />
            </Route>
        </Routes>
    )
}

export default AppRouter