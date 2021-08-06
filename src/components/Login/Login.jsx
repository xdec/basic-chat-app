import React from 'react';
import './Login.css';
import firebase from 'firebase/app';
import { auth } from '../../firebase';
import { FaFacebookF } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { RiChatSmile2Line } from 'react-icons/ri';
import { Helmet } from 'react-helmet';
import Owl from '../../images/owl-white-512.png';

const Login = () => {
    return (
        <div id="login" className="login-wrapper">
            <Helmet>
                <title>Dilog | Sign In</title>
                <meta
                    name="description"
                    content="Sign in to Dilog and start chatting."
                />
            </Helmet>
            <img src={ Owl } alt="MightyOwlDev" className="login-logo"/>
            <div id="loginCard" className="login-card">
                <h2 className="login-title">Start Chatting <RiChatSmile2Line/></h2>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GrGoogle/> Sign In With Google
                </div>
                <br/>
                <br/>
                <div
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FaFacebookF/> Sign In With Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;