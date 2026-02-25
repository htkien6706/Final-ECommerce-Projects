import { useOutletContext } from "react-router-dom";
import useSignupForm from "../hooks/useSignupForm.js";
import useSignupValidation from "../hooks/useSignupValidation.js";
import type { AuthContext } from "../pages/AuthPages.js";
import "../styles/common.css";
import "../styles/login.css";

export default function SignupFormComponent() {
    const signupHooks = useSignupForm();
    const signupValidationHooks = useSignupValidation();
    const {setIsLogin, setIsSignup} = useOutletContext<AuthContext>();
    return (
        <form className="signup-form">
            <h2 className="signup-title"> Create account</h2>
            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Your full name </span>
                <input
                    type="text"
                    placeholder="eg...Hoang Trung Kien"
                    value={signupHooks.signupFullname}
                    onChange={(e) => {
                        signupHooks.setSignupFullname(e.target.value);
                        console.log("Current Fullname is: ", signupHooks.signupFullname);
                        if (e.target.value.length >= 2) {
                            signupValidationHooks.setIsValidFullname(true);
                        }

                        else signupValidationHooks.setIsValidFullname(false);
                    }}></input>

                {!signupValidationHooks.isValidFullname && (
                    <span className="helper-text"> Full name must be at least 2 characters </span>
                )}
            </label>

            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Email </span>
                <input
                    style={{ backgroundImage: `url(auth_image/email-icon.jpg)` }}
                    type="email"
                    placeholder="eg:..hoangkien06072006@gmail.com"
                    value={signupHooks.signupEmail}
                    onChange={(e) => {
                        signupValidationHooks.setEmailExistedMessage(null);
                        signupHooks.setSignupEmail(e.target.value);
                        console.log("Current Email address is: ", signupHooks.signupEmail);

                        if (e.target.value.length >= 10) {
                            signupValidationHooks.setIsValidEmail(true);
                        }

                        else signupValidationHooks.setIsValidEmail(false);
                    }}
                ></input>

                {!signupValidationHooks.isValidEmail && (
                    <span className="helper-text"> Invalid email address !</span>
                )}


                <span className="helper-text"> {signupValidationHooks.emailExistedMessage}</span>
            </label>

            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Username </span>
                <input
                    style={{ backgroundImage: `url(auth_image/username-icon.png)`, backgroundSize: "20px", backgroundPosition: "left 13px center" }}
                    type="text"
                    placeholder="eg...htkien6706"
                    value={signupHooks.signupUsername}
                    onChange={(e) => {
                        signupValidationHooks.setUsernameExistedMessage(null);
                        signupHooks.setSignupUsername(e.target.value);
                        console.log("Current username is:", signupHooks.signupUsername);

                        if (e.target.value.length >= 8) {
                            signupValidationHooks.setIsValidUsername(true);
                        }

                        else signupValidationHooks.setIsValidUsername(false);
                    }}></input>

                {!signupValidationHooks.isValidUsername && (
                    <span className="helper-text"> Must be 8 digits longer, no whitespace allowed !</span>
                )}

                <span className="helper-text"> {signupValidationHooks.usernameExistedMessage}</span>
            </label>


            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}>  Password </span>
                <input
                    style={{ backgroundImage: `url("auth_image/visibility-icon.png")` }}
                    type="text"
                    placeholder="Your password"
                    value={signupHooks.signupPassword}
                    onChange={(e) => {
                       signupHooks. setSignupPassword(e.target.value);
                        console.log("Current password is: ", signupHooks.signupPassword);

                        if (e.target.value.length >= 8) {
                            signupValidationHooks.setIsValidPassword(true);
                        }
                        else signupValidationHooks.setIsValidPassword(false);
                    }}></input>

                {!signupValidationHooks.isValidPassword && (
                    <span className="helper-text"> Must be 8 digits or longer</span>
                )}
            </label>

            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Confirm password </span>
                <input
                    style={{ backgroundImage: `url("auth_image/confirm-password.png")`, backgroundSize: "20px" }}
                    type="text"
                    placeholder="Confirm your password"
                    value={signupHooks.signupPassword}
                    onChange={(e) => {
                        signupHooks.setSignupConfirmPassword(e.target.value);
                        console.log("The confirmed password is: ", signupHooks.signupConfirmPassword);

                        if (e.target.value.length >= 8) {
                            signupValidationHooks.setIsValidConfirmPassword(true);
                        }

                        else {
                            signupValidationHooks.setIsValidConfirmPassword(false);
                        }
                    }}></input>

                {!signupValidationHooks.isMatchingPassword && (
                    <span className="password-not-match"> Password does not match or invalid!</span>
                )}

                {signupValidationHooks.isMatchingPassword && (
                    <span className="matching-password"> Passwords match ✓</span>
                )}
            </label>

            <label
                className="checkbox-container"
            >
                <input
                    type="checkbox"
                    checked={signupValidationHooks.areTermsAgreed}
                    onChange={(e) => {
                        signupValidationHooks.setAreTermsAgreed(e.target.checked);
                    }}></input>
                <span className="checkmark"></span>
                By click this button, you agreed with our Terms of Service
            </label>

            <button
                className="signup-button"
                onClick={(e) => {
                    e.preventDefault();
                    console.log(signupValidationHooks.isValidFullname);
                    console.log(signupValidationHooks.isValidEmail);
                    console.log(signupValidationHooks.isValidUsername);
                    console.log(signupValidationHooks.isValidPassword);
                    console.log(signupValidationHooks.isMatchingPassword);
                    console.log(signupValidationHooks.areTermsAgreed);
                    if (signupValidationHooks.isValidFullname && signupValidationHooks.isValidEmail && signupValidationHooks.isValidUsername && signupValidationHooks.isValidPassword && signupValidationHooks.isMatchingPassword && signupValidationHooks.areTermsAgreed) {
                        console.log("All requirements are met !");

                        //call API endpoint auth/create-account, which is written in api/auth.api.ts in frontend
                    }
                }}
            > Create account !
            </button>

            <span className="already-have-account"> Already have an account ? <span className="move-to-signup" onClick={() => {
                setIsLogin(true);
                setIsSignup(false);
            }}> Sign up here </span></span>

        </form>
    )
}