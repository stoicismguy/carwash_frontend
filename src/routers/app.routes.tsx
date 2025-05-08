import { lazy } from "react";
import { Route } from "./types";
import { URLS } from "./app.urls";


const Login = lazy(() => import("@/pages/login"));
const Main = lazy(() => import("@/pages/main"));
const Register = lazy(() => import("@/pages/register"));
const Search = lazy(() => import("@/pages/search"));
const FAQ = lazy(() => import("@/pages/faq"));
const Profile = lazy(() => import("@/pages/profile"));
const ConfCarwash = lazy(() => import("@/pages/conf_carwash"));
const ConfBranch = lazy(() => import("@/pages/conf_branch"));
const BranchBookings = lazy(() => import("@/pages/branch_bookings"));
// const Login = () => <div>Login</div>;
// const Register = () => <div>Register</div>;

const Private = () => <div>PrivatePage</div>;

export const PublicRoutes: Route[] = [
    {
        path: URLS.BASE,
        element: <Main />,
    },
    {
        path: URLS.LOGIN,
        element: <Login />,
    },
    {
        path: URLS.REGISTER,
        element: <Register />,
    },
    {
        path: URLS.SEARCH,
        element: <Search />,
    },
    {
        path: URLS.FAQ,
        element: <FAQ />,
    }
]

export const PrivateRoutes: Route[] = [
    {
        path: URLS.PRIVATE,
        element: <Private />,
    },
    {
        path: URLS.PROFILE,
        element: <Profile />,
    },
    {
        path: URLS.CONF_CARWASH,
        element: <ConfCarwash />,
    },
    {
        path: URLS.CONF_BRANCH,
        element: <ConfBranch />,
    },
    {
        path: URLS.CONF_BRANCH_BOOKINGS,
        element: <BranchBookings />,
    }
]