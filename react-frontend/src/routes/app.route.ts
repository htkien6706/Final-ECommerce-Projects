import { createBrowserRouter } from "react-router-dom";
import authRouter from "./auth.route.js";

const authenRouter = authRouter();
export const router = createBrowserRouter([
    ...authenRouter,
])