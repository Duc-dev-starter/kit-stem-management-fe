import { Route, Routes } from "react-router-dom"
import { Terms, AdminLoginPage, AboutPage, AdminManageBlogs, AdminDashboard, AdminManageCategories, AdminManageUsers, HomePage, KitDetail, Login, ManageKit, ManageKitDelivery, ManageKitDeliveryDetail, ManageLab, ManagerDashboard, ManageUser, Register, Policy, Guidelines, Support } from "../pages"
import Dashboard from "../components/dashboard"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms/policy" element={<Policy />} />
            <Route path="/terms/guidelines" element={<Guidelines />} />
            <Route path="/support" element={<Support />} />

            <Route path="/manager/*" element={<Dashboard />}>
                {/* <Route path="manager-page" element={<ManagerPage />} /> */}
                <Route path="dashboard" element={<ManagerDashboard />} />
                <Route path="manage-user" element={<ManageUser />} />
                <Route path="manage-kit" element={<ManageKit />} />
                <Route path="manage-kit/:_id" element={<KitDetail />} />
                <Route path="manage-lab" element={<ManageLab />} />
                <Route path="manage-kit-delivery" element={<ManageKitDelivery />} />
                <Route path="manage-kit-delivery-detail" element={<ManageKitDeliveryDetail />} />
            </Route>
            <Route path="/admin/login" element={<AdminLoginPage />} />
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