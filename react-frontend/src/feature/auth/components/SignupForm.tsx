import { useNavigate, useOutletContext } from "react-router-dom";
import useSignupForm from "../hooks/useSignupForm.js";
import useSignupValidation from "../hooks/useSignupValidation.js";
import type { AuthContext } from "../pages/AuthPages.js";
import "../styles/common.css";
import "../styles/signup.css";
import { signupApi } from "../api/auth.api.js";

export default function SignupFormComponent() {
    const signup = useSignupForm();
    const signupValidationHooks = useSignupValidation();
    const {setIsLogin, setIsSignup} = useOutletContext<AuthContext>();
    //using navigate to redirect to another page
    const navigate = useNavigate();
    let showPassword : boolean = false;
    let isMatchingPassword : boolean = (signup.signupPassword === signup.signupConfirmPassword) && signupValidationHooks.isValidPassword;
    return (
        <form className="signup-form">
            <h2 className="signup-title"> Create account</h2>
            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Your full name </span>
                <input
                    style={{backgroundImage:`url(/auth_image/name-icon.png)`, backgroundSize:"30px",}}
                    type="text"
                    placeholder="eg...Hoang Trung Kien"
                    value={signup.signupFullname}
                    onChange={(e) => {
                        signup.setSignupFullname(e.target.value);
                        console.log("Current Fullname is: ", signup.signupFullname);
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
                    style={{ backgroundImage: `url(/auth_image/email-icon.jpg)` }}
                    type="email"
                    placeholder="eg:..hoangkien06072006@gmail.com"
                    value={signup.signupEmail}
                    onChange={(e) => {
                        signupValidationHooks.setEmailExistedMessage(null);
                        signup.setSignupEmail(e.target.value);
                        console.log("Current Email address is: ", signup.signupEmail);

                        if (e.target.value.length < 10 || !e.target.value.includes('@') || e.target.value.includes(' ')) {
                            signupValidationHooks.setIsValidEmail(false);
                        }

                        else signupValidationHooks.setIsValidEmail(true);
                    }}
                ></input>

                {!signupValidationHooks.isValidEmail && (
                    <span className="helper-text"> Invalid email address detected!</span>
                )}


                <span className="helper-text"> {signupValidationHooks.emailExistedMessage}</span>
            </label>

            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Username </span>
                <input
                    style={{ backgroundImage: `url(/auth_image/username-icon.png)`, backgroundSize: "20px", backgroundPosition: "left 13px center" }}
                    type="text"
                    placeholder="eg...htkien6706"
                    value={signup.signupUsername}
                    onChange={(e) => {
                        signupValidationHooks.setUsernameExistedMessage(null);
                        signup.setSignupUsername(e.target.value);
                        console.log("Current username is:", signup.signupUsername);

                        if(e.target.value.length < 8 || e.target.value.includes(' ')) {
                            signupValidationHooks.setIsValidUsername(false);
                        }

                        else signupValidationHooks.setIsValidUsername(true);

                    }}></input>

                {!signupValidationHooks.isValidUsername && (
                    <span className="helper-text"> Must be 8 digits longer, no whitespace allowed !</span>
                )}

                <span className="helper-text"> {signupValidationHooks.usernameExistedMessage}</span>
            </label>


            <label>
                <span style={{ color: "#7A5C61", fontWeight: "700" }}>  Password </span>
                <input
                    style={{ backgroundImage: `url("/auth_image/visibility-icon.png")` }}
                    type="text"
                    placeholder="Your password"
                    value={signup.signupPassword}
                    onChange={(e) => {
                       signup. setSignupPassword(e.target.value);
                        console.log("Current password is: ", signup.signupPassword);

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
                    style={{ backgroundImage: `url("/auth_image/confirm-password.png")`, backgroundSize: "20px" }}
                    type="text"
                    placeholder="Confirm your password"
                    value={signup.signupConfirmPassword}
                    onChange={(e) => {
                        signup.setSignupConfirmPassword(e.target.value);
                        console.log("The confirmed password is: ", signup.signupConfirmPassword);

                        if (e.target.value.length >= 8) {
                            signupValidationHooks.setIsValidConfirmPassword(true);
                        }

                        else {
                            signupValidationHooks.setIsValidConfirmPassword(false);
                        }
                    }}></input>

                {!isMatchingPassword && (
                    <span className="password-not-match"> Password does not match or invalid!</span>
                )}

                {isMatchingPassword && (
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
            
            {/* this is where we call the api to get user's json web token, final step of verification*/}
            <button
                className="signup-button"
                onClick={async (e) => {
                    e.preventDefault();
                    console.log("Is fullname valid:",signupValidationHooks.isValidFullname);
                    console.log("Is email valid:",signupValidationHooks.isValidEmail);
                    console.log("Is username valid:",signupValidationHooks.isValidUsername);
                    console.log("Is password valid:",signupValidationHooks.isValidPassword);
                    console.log("Does password matches ?:",isMatchingPassword);
                    console.log("Are terms agreed:",signupValidationHooks.areTermsAgreed);
                    if (signupValidationHooks.isValidFullname && signupValidationHooks.isValidEmail && signupValidationHooks.isValidUsername && signupValidationHooks.isValidPassword && isMatchingPassword && signupValidationHooks.areTermsAgreed) {
                        console.log("All requirements are met !");

                        const fullname = signup.signupFullname;
                        const email = signup.signupEmail;
                        const username = signup.signupUsername;
                        const password = signup.signupPassword;
                        const newUser = {fullname, email, username, password};

                        //call API endpoint auth/create-account, which is written in api/auth.api.ts in frontend
                        const signupAPIResponse = await signupApi(newUser);
                        console.log(signupAPIResponse);

                        //username already existed, try another username
                        if(signupAPIResponse.message.includes("username")) {
                            signupValidationHooks.setUsernameExistedMessage(signupAPIResponse.message);
                            console.log("The message user get when the same username found:", signupValidationHooks.usernameExistedMessage);
                        }

                        else if(signupAPIResponse.message.includes("email")) {
                            console.log("The message user receive when same email address found!", signupAPIResponse.message);
                        }

                        else {
                            console.log("Account has been successfully created ! Please log in to continue");
                        }
                        
                    }
                }}
            > Create account !
            </button>

            {/* We can use the link in react router to navigate to another page, but this time i use useNavigate function */}
            <span className="already-have-account"> Already have an account ? <span className="move-to-login" onClick={() => {
                setIsLogin(true);
                setIsSignup(false);
                navigate("/auth/login", {replace: true});
                navigate(0);
            }}> Sign up here </span></span>

        </form>
    )
}