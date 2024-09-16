import { Route, Routes } from "react-router-dom"
import { AboutPage, HomePage, ManageKit, ManageKitDeliveryDetail, ManageLab } from "../pages"
import Dashboard from "../components/dashboard"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/manager/*" element={<Dashboard />}>
                {/* <Route path="manager-page" element={<ManagerPage />} /> */}
                <Route path="manage-kit" element={<ManageKit />} />
                <Route path="manage-lab" element={<ManageLab />} />
                <Route path="manage-kit-delivery" element={<ManageKitDeliveryDetail />} />
            </Route>
        </Routes>
    )
}

export default AppRouter