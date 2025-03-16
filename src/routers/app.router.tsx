import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./app.routes";
import { ErrorElement } from "./errorElement/errorElement";
import { useAuth } from "@/AuthContext";
import React from "react";

interface IRoute {
    element: React.ReactElement
}

// Логика проверки какой-нибудь хуйни для пользователя
const PrivateRouterWrapper = ({ element }: IRoute) => {
    // return element
    const { a } = useAuth();
    return a ? element : <ErrorElement />
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

