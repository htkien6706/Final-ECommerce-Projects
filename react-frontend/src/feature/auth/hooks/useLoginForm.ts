import { useState } from "react";

export default function useLoginForm() {
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    return {
        loginUsername, setLoginUsername,
        loginPassword, setLoginPassword,
    }
}