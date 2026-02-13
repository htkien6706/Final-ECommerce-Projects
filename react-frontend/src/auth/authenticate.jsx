import "./authenticate.css"

export default function Authenticate() {
    return (
        <div className="container">
            <div className="auth-form">
                <div className="left-side-wrapper">
                    <div className="left-side">
                        <img className="left-image" src="auth_image/auth-picture.webp"></img>
                    </div>
                </div>
                <div className="right-side">
                    <form className="login-form">
                        <h2 className="login-title"> Log In</h2>
                        <label className="username-part">
                            <span style={{ fontFamily: "sans-serif", fontWeight: "600" }}> Username </span>
                            <input type="text" id="username-input" placeholder="Enter your username"></input>
                        </label>

                        <label className="password-part">
                            <span style={{ fontFamily: "sans-serif", fontWeight: "600" }}> Password</span>
                            <input type="text" id="password-input" placeholder="Enter your password !"></input>
                        </label>

                        <h4 className="forgot-password"> Forgot password?</h4>

                        <div className="login-btn-div">
                            <button className="login-btn"> LOGIN </button>
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
                            <span style={{ textDecoration: "underline", cursor: "pointer" }}> Sign up here ! </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}