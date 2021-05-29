import React from 'react';
import './Login.css';
import {loginUrl} from './spotify';
import MusifyLogo from './assets/spotify.svg';

function Login() {
    return (
        <div className="login">
            {/* Musify Logo */}
            <div className="musify__logoDiv">
                <img className="musify__logo" src={MusifyLogo} alt="Musify"/>
                <span>musify</span>
            </div>

            {/* Login with spotify */}
            <a href={loginUrl} className="login__button">LOGIN WITH MUSIFY</a>

        </div>
    )
}

export default Login;
