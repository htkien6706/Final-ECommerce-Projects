import { useState } from "react";
import "./checkbox.css";



export default function Authenticate() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //must have state of which part we are in, login or signup
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupFullname, setSignupFullname] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');

    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
    const [isValidFullname, setIsValidFullname] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [areTermsAgreed, setAreTermsAgreed] = useState(false);
    const isMatchingPassword = (signupPassword === signupConfirmPassword) && isValidPassword;

    const [usernameExistedMessage, setUsernameExistedMessage] = useState(null);
    const [emailExistedMessage, setEmailExistedMessage] = useState(null);

    async function handleSignupButton(fullname, email, username, password) {
        const newUser = {
            fullname: fullname,
            email: email,
            username: username,
            password: password,
        }

        const response = await fetch("http://localhost:3000/auth/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
        })

        const result = await response.json();
        console.log(result);

        if (!result.done) {
            if (result.message === 'Username existed! Please try another username') {
                setUsernameExistedMessage(result.message);
            }

            if (result.message === 'Same email found! Plase try using another email') {
                setEmailExistedMessage(result.message);
            }
        }
    }

    return (
        <div className="container">
            <div className="auth-form">
                <div className="left-side-wrapper">
                    <div className="left-side">
                        <img className="left-image" src="auth_image/auth-picture.webp"></img>
                    </div>
                </div>
                <div className="right-side">
                    {isLogin && (
                        <form className="login-form">
                            <h2 className="login-title"> Log In</h2>
                            <label className="username-part">
                                <span> Username </span>
                                <input type="text" id="username-input" placeholder="Enter your username" onChange={(e) => {
                                    console.log(e.target.value);
                                    setUsername(e.target.value);
                                }}></input>
                            </label>

                            <label className="password-part">
                                <span> Password </span>
                                <input type="text" id="password-input" placeholder="Enter your password !" onChange={(e) => {
                                    console.log(e.target.value);
                                    setPassword(e.target.value);
                                }}></input>
                            </label>

                            <h4 className="forgot-password"> Forgot password?</h4>

                            <div className="login-btn-div">
                                <button className="login-btn" onClick={(e) => {
                                    e.preventDefault();
                                }}> LOGIN </button>
                            </div>

                            <div className="seperator"> Or continue with </div>

                            <div className="other-authen-options">
                                <button className="facebook-login">
                                    <div className="facebook-div">
                                        <img className='facebook-image' src="auth_image/facebook-icon.png"></img>
                                    </div>
                                    Continue with Facebook

                                </button>
                                <button className="google-login">
                                    <div className="google-div">
                                        <img className="google-image" src="auth_image/google-icon.png"></img>
                                    </div>
                                    Continue with Google

                                </button>
                            </div>

                            <div className="redirect-signup">
                                <span style={{ fontWeight: 570, marginRight: "10px" }}> Do not have account yet ? </span>
                                <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                                    setIsSignup(true);
                                    setIsLogin(false);
                                }}> Sign up here ! </span>
                            </div>
                        </form>
                    )}

                    {isSignup && (
                        <form className="signup-form">
                            <h2 className="signup-title"> Create account</h2>
                            <label>
                                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Your full name </span>
                                <input
                                    type="text"
                                    placeholder="eg...Hoang Trung Kien"
                                    onChange={(e) => {
                                        setSignupFullname(e.target.value);
                                        console.log("Current Fullname is: ", signupFullname);
                                        if (e.target.value.length >= 2) {
                                            setIsValidFullname(true);
                                        }

                                        else setIsValidFullname(false);
                                    }}></input>

                                {!isValidFullname && (
                                    <span className="helper-text"> Full name must be at least 2 characters </span>
                                )}
                            </label>

                            <label>
                                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Email </span>
                                <input
                                    style={{ backgroundImage: `url(auth_image/email-icon.jpg)` }}
                                    type="email"
                                    placeholder="eg:..hoangkien06072006@gmail.com"
                                    onChange={(e) => {
                                        setUsernameExistedMessage(null);
                                        setSignupEmail(e.target.value);
                                        console.log("Current Email address is: ", signupEmail);

                                        if (e.target.value.length >= 10) {
                                            setIsValidEmail(true);
                                        }

                                        else setIsValidEmail(false);
                                    }}
                                ></input>

                                {!isValidEmail && (
                                    <span className="helper-text"> Invalid email address !</span>
                                )}


                                <span className="helper-text"> {emailExistedMessage}</span>
                            </label>

                            <label>
                                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Username </span>
                                <input
                                    style={{ backgroundImage: `url(auth_image/username-icon.png)`, backgroundSize: "20px", backgroundPosition: "left 13px center" }}
                                    type="text"
                                    placeholder="eg...htkien6706"
                                    onChange={(e) => {
                                        setUsernameExistedMessage(null);
                                        setSignupUsername(e.target.value);
                                        console.log("Current username is:", signupUsername);

                                        if (e.target.value.length >= 8) {
                                            setIsValidUsername(true);
                                        }

                                        else setIsValidUsername(false);
                                    }}></input>

                                {!isValidUsername && (
                                    <span className="helper-text"> Must be 8 digits longer, no whitespace allowed !</span>
                                )}

                                <span className="helper-text"> {usernameExistedMessage}</span>
                            </label>


                            <label>
                                <span style={{ color: "#7A5C61", fontWeight: "700" }}>  Password </span>
                                <input
                                    style={{ backgroundImage: `url("auth_image/visibility-icon.png")` }}
                                    type="text"
                                    placeholder="Your password"
                                    onChange={(e) => {
                                        setSignupPassword(e.target.value);
                                        console.log("Current password is: ", signupPassword);

                                        if (e.target.value.length >= 8) {
                                            setIsValidPassword(true);
                                        }
                                        else setIsValidPassword(false);
                                    }}></input>

                                {!isValidPassword && (
                                    <span className="helper-text"> Must be 8 digits or longer</span>
                                )}
                            </label>

                            <label>
                                <span style={{ color: "#7A5C61", fontWeight: "700" }}> Confirm password </span>
                                <input
                                    style={{ backgroundImage: `url("auth_image/confirm-password.png")`, backgroundSize: "20px" }}
                                    type="text"
                                    placeholder="Confirm your password"
                                    onChange={(e) => {
                                        setSignupConfirmPassword(e.target.value);
                                        console.log("The confirmed password is: ", signupConfirmPassword);

                                        if (e.target.value.length >= 8) {
                                            setIsValidConfirmPassword(true);
                                        }

                                        else {
                                            setIsValidConfirmPassword(false);
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
                                    checked={areTermsAgreed}
                                    onChange={(e) => {
                                        setAreTermsAgreed(e.target.checked);
                                    }}></input>
                                <span className="checkmark"></span>
                                By click this button, you agreed with our Terms of Service
                            </label>

                            <button
                                className="signup-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(isValidFullname);
                                    console.log(isValidEmail);
                                    console.log(isValidUsername);
                                    console.log(isValidPassword);
                                    console.log(isMatchingPassword);
                                    console.log(areTermsAgreed);
                                    if (isValidFullname && isValidEmail && isValidUsername && isValidPassword && isMatchingPassword && areTermsAgreed) {
                                        console.log("All requirements are met !");
                                        handleSignupButton(signupFullname, signupEmail, signupUsername, signupPassword);
                                    }
                                }}
                            > Create account !
                            </button>

                            <span className="already-have-account"> Already have an account ? <span className="move-to-signup" onClick={() => {
                                setIsLogin(true);
                                setIsSignup(false);
                            }}> Sign up here </span></span>

                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}