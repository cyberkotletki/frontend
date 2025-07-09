import { Routes, Route } from "react-router-dom";

import HomePage from "../components/pages/Home/Home.tsx";
import AddWish from "../components/pages/AddWish/AddWish.tsx";
import ProfilePage from "../components/pages/Profile/Profile.tsx";
import WishlistPage from "../components/pages/WishLish/Wishlist.tsx";

import { routes } from "./App.routes.ts";
import DonatHistoryPage from "@/components/pages/DonatHistory/DonatHistory.tsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path={routes.home()} />
      <Route element={<AddWish />} path={routes.addwish()} />
      <Route element={<ProfilePage />} path={routes.profile()} />
      <Route element={<WishlistPage />} path={routes.wishlist(":id")} />
      <Route element={<DonatHistoryPage />} path={routes.donathistory()}/>
    </Routes>
  );
};
