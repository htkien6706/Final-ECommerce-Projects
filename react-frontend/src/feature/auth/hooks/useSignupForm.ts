import { useState } from "react";

export default function useSignupForm() {
    const [signupUsername, setSignupUsername] = useState<string>('');
    const [signupPassword, setSignupPassword] = useState<string>('');
    const [signupFullname, setSignupFullname] = useState<string>('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState<string>('');
    const [signupEmail, setSignupEmail] = useState<string>('');

    return {
        signupUsername, setSignupUsername,
        signupPassword, setSignupPassword,
        signupFullname, setSignupFullname,
        signupConfirmPassword, setSignupConfirmPassword,
        signupEmail, setSignupEmail,
    }
}