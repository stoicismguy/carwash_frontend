import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./app.routes";
import { ErrorElement } from "./errorElement/errorElement";


export const appRouter = createBrowserRouter([
    ...PublicRoutes.map((route) => ({
        path: route.path,
        element: route.element
    })),
    ...PrivateRoutes.map((route) => ({
        path: route.path,
        element: route.element
    })),
    {
        path: "*",
        element: <ErrorElement />
    }
])