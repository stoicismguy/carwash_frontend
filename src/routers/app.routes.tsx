import { lazy } from "react";
import { Route } from "./types";
import React from "react";
import { URLS } from "./app.urls";


const Login = lazy(() => import("@/pages/login"));
// const Register = lazy(() => import("@/pages/register"));
// const Login = () => <div>Login</div>;
const Register = () => <div>Register</div>;

const Private = () => <div>PrivatePage</div>;

export const PublicRoutes: Route[] = [
    {
        path: URLS.BASE,
        element: <div>Home</div>,
    },
    {
        path: URLS.LOGIN,
        element: <Login />,
    },
    {
        path: URLS.REGISTER,
        element: <Register />,
    }
]

export const PrivateRoutes: Route[] = [
    {
        path: URLS.PRIVATE,
        element: <Private />,
    }
]