import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PageNotFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import { getProfile } from "services/user";

function Router() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  
  if (isPending) return <h1>loading...</h1>

  if (error) return <h1>{error}</h1>

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
