import { createBrowserRouter } from "react-router-dom";
import authRouter from "./auth.route.js";
import AdminLayout from "../admin/pages/AdminLayout.js";

const authenRouter = authRouter();
export const router = createBrowserRouter([
    ...authenRouter,
    {
        path:"layout",
        Component:AdminLayout,
    }
])