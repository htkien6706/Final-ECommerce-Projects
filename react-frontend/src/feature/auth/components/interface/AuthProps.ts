import type React from "react";

export interface ISetAuthProps {
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}