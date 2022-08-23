import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-title">Login</div>
                        <div className="col-12 form-group login-input">
                            <label className="login-label">Username</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter your username"
                            />
                            <span className="login-focus"></span>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label className="login-label">Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                            />
                            <span className="login-focus"></span>
                        </div>
                        <div className="col-12">
                            <span className="forgot-pass">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12">
                            <button className="login-btn">Login</button>
                        </div>
                        <div className="col-12">
                            <span className="login-order">
                                Or Sign Up Using
                            </span>
                        </div>
                        <div className="col-12">
                            <span className="login-social">
                                <div className="login-social-icon facebook">
                                    <i class="fab fa-facebook-f"></i>
                                </div>
                                <div className="login-social-icon twitter">
                                    <i class="fab fa-twitter"></i>
                                </div>
                                <div className="login-social-icon google">
                                    <i class="fab fa-google"></i>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
