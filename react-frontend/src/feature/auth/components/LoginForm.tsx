import useLoginForm from "../hooks/useLoginForm.js";
import type { ISetAuthProps, } from "./interface/AuthProps.js";
import type { AuthContext } from "../pages/AuthPages.js";
import { useOutletContext } from "react-router-dom";
import '../styles/login.css';
import '../styles/common.css';

export default function LoginFormComponent() {
    
    const {setIsLogin, setIsSignup} = useOutletContext<AuthContext>();
    const loginHooks = useLoginForm();
    return (
        <form className="login-form">
            <h2 className="login-title"> Log In</h2>
            <label className="username-part">
                <span> Username </span>
                <input 
                type="text" 
                id="username-input" 
                value={loginHooks.loginUsername}
                placeholder="Enter your username" onChange={(e) => {
                    console.log(e.target.value);
                    loginHooks.setLoginUsername(e.target.value);
                }}></input>
            </label>

            <label className="password-part">
                <span> Password </span>
                <input 
                type="text" 
                id="password-input" 
                placeholder="Enter your password !"
                value={loginHooks.loginPassword}
                onChange={(e) => {
                    console.log(e.target.value);
                    loginHooks.setLoginPassword(e.target.value);
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
                        <img className='facebook-image' src="/auth_image/facebook-icon.png"></img>
                    </div>
                    Continue with Facebook

                </button>
                <button className="google-login">
                    <div className="google-div">
                        <img className="google-image" src="/auth_image/google-icon.png"></img>
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
    )
}