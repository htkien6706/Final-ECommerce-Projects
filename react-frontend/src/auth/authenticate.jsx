import { useState } from "react";
import "./authenticate.css";
import "./checkbox.css";

function handleLoginButton(username, password) {
    const userInfo = { username, password };

    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    }
    )
        .then(response => response.text()).then(data => {
            console.log(data);
        });
}

export default function Authenticate() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    //must have state of which part we are in, login or signup
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

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
                                <span style={{ fontFamily: "sans-serif", fontWeight: "600" }}> Username </span>
                                <input type="text" id="username-input" placeholder="Enter your username" onChange={(e) => {
                                    console.log(e.target.value);
                                    setUsername(e.target.value);
                                }}></input>
                            </label>

                            <label className="password-part">
                                <span style={{ fontFamily: "sans-serif", fontWeight: "600" }}> Password</span>
                                <input type="text" id="password-input" placeholder="Enter your password !" onChange={(e) => {
                                    console.log(e.target.value);
                                    setPassword(e.target.value);
                                }}></input>
                            </label>

                            <h4 className="forgot-password"> Forgot password?</h4>

                            <div className="login-btn-div">
                                <button className="login-btn" onClick={(e) => {
                                    e.preventDefault();
                                    handleLoginButton(username, password);
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
                                Your Fullname
                                <input type="text" placeholder="Let me know your full name !"></input>
                            </label>

                            <label>
                                Your Email
                                <input type="email" placeholder="Let me get your email address ?"></input>
                            </label>

                            <label>
                                Your username
                                <input type="text" placeholder="What username you want to represent yourself ?"></input>
                            </label>


                            <label>
                                Your password
                                <input type="text" placeholder="Your password"></input>
                            </label>

                            <label>
                                Confirm password
                                <input type="text" placeholder="Confirm your password"></input>
                            </label>

                            <label className="checkbox-container">
                                <input type="checkbox"></input>
                                <span className="checkmark"></span>
                                By click this button, you agreed with out Terms of Service
                            </label>

                            <button className="signup-button"> Create account !</button>

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