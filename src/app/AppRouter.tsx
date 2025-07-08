import { Routes, Route } from 'react-router-dom';
import HomePage from "../components/pages/Home/Home.tsx";
import {routes} from "./App.routes.ts";
import AddWish from "../components/pages/AddWish/AddWish.tsx";



export const AppRouter = () => {
    return (
        <Routes>
            <Route path={routes.home()} element={<HomePage />} />
            <Route path={routes.addwish()} element={<AddWish />} />
        </Routes>
    )
}