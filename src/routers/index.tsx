import { Route, Routes } from "react-router-dom"
import { AboutPage, HomePage } from "../pages"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    )
}

export default AppRouter