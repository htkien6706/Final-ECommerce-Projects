import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export type AuthContext = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isSignup, setIsSignup] = useState<boolean>(false);

    return (
        <div className="container">
            <div className="auth-form">
                <div className="left-side-wrapper">
                    <div className="left-side">
                        <img className="left-image" src="auth_image/auth-picture.webp"></img>
                    </div>
                </div>
            </div>

            <div className="right-side">
                <Outlet context={{setIsLogin, setIsSignup}}/>
            </div>
        </div>
    )
}

