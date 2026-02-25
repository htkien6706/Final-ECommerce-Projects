import { Children, Component, useState } from "react";
import AuthPage from "../feature/auth/pages/AuthPages.js";
import SignupFormComponent from "../feature/auth/components/SignupForm.js";
import LoginFormComponent from "../feature/auth/components/LoginForm.js";


export default function authRouter() {
    return [
        {
            path: "/auth",
            Component: AuthPage,
            children: [
                { index: true, path:"login", Component: LoginFormComponent },
                { path: "register", Component: SignupFormComponent },
            ]
        },
    ]
}