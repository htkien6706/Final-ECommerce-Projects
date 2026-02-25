import { loginApi, signupApi } from "../api/auth.api.js";
import { useState } from "react";

export default function useAuthForm() {
    //state for login, just need username and password
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    const [signupUsername, setSignupUsername] = useState<string>('');
    const [signupPassword, setSignupPassword] = useState<string>('');
    const [signupFullname, setSignupFullname] = useState<string>('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState<string>('');
    const [signupEmail, setSignupEmail] = useState<string>('');

    return {
        loginUsername, setLoginUsername,
        loginPassword, setLoginPassword,
        signupUsername, setSignupUsername,
        signupPassword, setSignupPassword,
        signupFullname, setSignupFullname,
        signupConfirmPassword, setSignupConfirmPassword,
        signupEmail, setSignupEmail,
    }
}