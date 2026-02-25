import { useState } from "react";
import useSignupForm from "./useSignupForm.js";

export default function useSignupValidation() {
    const signupForm = useSignupForm();

    const [isValidUsername, setIsValidUsername] = useState<boolean>(false);
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(false);
    const [isValidFullname, setIsValidFullname] = useState<boolean>(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [areTermsAgreed, setAreTermsAgreed] = useState<boolean>(false);
    const isMatchingPassword = (signupForm.signupPassword === signupForm.signupConfirmPassword) && isValidPassword;

    const [usernameExistedMessage, setUsernameExistedMessage] = useState(null);
    const [emailExistedMessage, setEmailExistedMessage] = useState(null);

    return {
        isValidUsername, setIsValidUsername,
        isValidPassword, setIsValidPassword,
        isValidConfirmPassword, setIsValidConfirmPassword,
        isValidFullname, setIsValidFullname,
        isValidEmail, setIsValidEmail,
        areTermsAgreed, setAreTermsAgreed,
        isMatchingPassword,
        usernameExistedMessage, setUsernameExistedMessage,
        emailExistedMessage, setEmailExistedMessage,
    }
}