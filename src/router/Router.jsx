import { Route, Routes } from "react-router-dom";

import PageNotFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";

function Router() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
