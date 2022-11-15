import React, { useEffect, useState } from 'react'
import { firebase, ui, auth } from "../firebase/firebase.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    useEffect(() => {
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    var user = authResult.user;
                    var credential = authResult.credential;
                    var isNewUser = authResult.additionalUserInfo.isNewUser;
                    var providerId = authResult.additionalUserInfo.providerId;
                    var operationType = authResult.operationType;
                    return true;
                },
                signInFailure: function (error) {
                   return handleUIError(error);
                },
                uiShown: function () {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            queryParameterForWidgetMode: 'mode',
            queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
            signInFlow: 'popup',
            signInSuccessUrl: '/home',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    providerName: 'Google',
                    scopes: [
                        'https://www.googleapis.com/auth/contacts.readonly'
                    ],
                    customParameters: {
                        prompt: 'consent'
                    },
                },
                {
                    provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    providerName: 'Github',
                },
                // {
                //     provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                //     // Invisible reCAPTCHA with image challenge and bottom left badge.
                //     recaptchaParameters: {
                //       type: 'image',
                //       size: 'invisible',
                //       badge: 'bottomleft'
                //     },
                //     defaultCountry: 'VN',
                //     defaultNationalNumber: '1234567890',
                // },
                'apple.com',
            ],
            immediateFederatedRedirect: false,
        };
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);

    function LoginWithEmailAndPassword() {
        console.log('e', [email, password]);
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in
            var user = userCredential.user;
            console.log('user', user);
        // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('errorMessage', errorMessage);
        });
    }
    return (
        <>
            <div className="divLogin">
                <div className="login-head">
                    <div className="dududulogin">
                        <img alt="" src={"/assets/icon/dududu.png"} width="35" height="35" className="" />
                        <p>Dududu</p>
                    </div>
                </div>
                <div className="login-body">
                    <div className="login-wrap">
                        <div className="login-container">
                            <div id="firebaseui-auth-container"></div>
                            <div id="loader">Loading...</div>
                            <div className="wrapHr">
                                <hr className="lineHr" />
                                <span className="centerHr">or</span>
                                <hr className="lineHr" />
                            </div>
                            <Form className="login-form">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" className="col" />
                                    <Button variant="danger" type="button" className="col" onClick={LoginWithEmailAndPassword}>
                                        Come with Dududu
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                        <hr className="lineHr my-4" />
                        <div className="sign-up-selection">
                            <p className="mb-4 mt-5">Don't have an account?</p>
                            <Button variant="success" type="button" className="form-control col">
                                Sign Up for Dududu
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
