import { Routes, Route } from "react-router-dom";
import { LandingPage, LoginPage } from "../pages/index";
import LandingLayout from "../layout/landingLayout";

export default function PublicRoutes() {
  return (
    <LandingLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </LandingLayout>
  );
}
