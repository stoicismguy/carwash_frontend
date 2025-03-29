import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./app.routes";
import { ErrorElement } from "./errorElement/errorElement";
import { useAuth } from "@/AuthContext";
import React from "react";
import { GoLogin } from "./goLogin";

interface IRoute {
    element: React.ReactElement
}

// Если пользователь не авторизован то и делать ему на этих страницах нечего
const PrivateRouterWrapper = ({ element }: IRoute) => {
    const { user } = useAuth();
    const currentUser = user();
    return currentUser ? element : <GoLogin />;
}

export const appRouter = createBrowserRouter([
    ...PublicRoutes.map((route) => ({
        path: route.path,
        element: route.element
    })),
    ...PrivateRoutes.map((route) => ({
        path: route.path,
        element: <PrivateRouterWrapper element={route.element} />
    })),
    {
        path: "*",
        element: <ErrorElement />
    }
])

