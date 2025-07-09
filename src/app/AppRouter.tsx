import { Routes, Route } from "react-router-dom";

import HomePage from "../components/pages/Home/Home.tsx";
import AddWish from "../components/pages/AddWish/AddWish.tsx";
import ProfilePage from "../components/pages/Profile/Profile.tsx";
import WishlistPage from "../components/pages/WishLish/Wishlist.tsx";
import WishPage from "../components/pages/Wish/Wish.tsx";

import { routes } from "./App.routes.ts";

import DonatHistoryPage from "@/components/pages/DonatHistory/DonatHistory.tsx";
import Register from "@/components/pages/Register/Register.tsx";
import Settings from "@/components/pages/Settings/Settings.tsx";
import WithdrawalPage from "@/components/pages/Withdrawal/Withdrawal.tsx";
import ErrorPage from "@/components/pages/Error/Error.tsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path={routes.home()} />
      <Route element={<AddWish />} path={routes.addwish()} />
      <Route element={<ProfilePage />} path={routes.profile()} />
      <Route element={<WishlistPage />} path={routes.wishlist(":id")} />
      <Route element={<WishPage />} path={routes.wish(":id")} />
      <Route element={<Settings />} path={routes.settings()} />
      <Route element={<DonatHistoryPage />} path={routes.donathistory()} />
      <Route element={<WithdrawalPage />} path={routes.withdrawal()} />
      <Route element={<Register />} path={routes.register()} />
      <Route element={<ErrorPage />} path={routes.error()} />
    </Routes>
  );
};
