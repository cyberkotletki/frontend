import { Routes, Route } from "react-router-dom";

import HomePage from "../components/pages/Home/Home.tsx";
import AddWish from "../components/pages/AddWish/AddWish.tsx";
import ProfilePage from "../components/pages/Profile/Profile.tsx";

import { routes } from "./App.routes.ts";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path={routes.home()} />
      <Route element={<AddWish />} path={routes.addwish()} />
      <Route element={<ProfilePage />} path={routes.profile()} />
    </Routes>
  );
};
