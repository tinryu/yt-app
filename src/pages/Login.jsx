import React, { useEffect } from 'react'
import { firebase, auth } from "../firebase/firebase.js";

export default function Login() {
    function toggleSignIn(swt) {
        if (!auth.currentUser) {
            if (swt === 'login') {
                var email = 'storeman1311@gmail.com';
                var password = '123456'
                if (email.length < 4) {
                    alert('Please enter an email address.');
                    return;
                }
                if (password.length < 4) {
                    alert('Please enter a password.');
                    return;
                }
                auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                });
            } else {                
                if (swt === 'google') {
                    var provider = new firebase.auth.GoogleAuthProvider();
                    provider.addScope('https://www.googleapis.com/auth/plus.login');
                    auth.signInWithRedirect(provider);
                } else if(swt === 'facebook') {
                    var provider = new firebase.auth.FacebookAuthProvider();
                    provider.addScope('user_likes');
                    auth.signInWithRedirect(provider);
                }
            }            
        } else {
            auth.signOut();
        }
        document.getElementById('quickstart-sign-in').disabled = true;
    }
    function initApp() {
        // Result from Redirect auth flow.
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                document.getElementById('quickstart-oauthtoken').textContent = token;
            } else {
                document.getElementById('quickstart-oauthtoken').textContent = 'null';
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
        });

        // Listening for auth state changes.
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            } else {
                // User is signed out.
                document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                document.getElementById('quickstart-account-details').textContent = 'null';
                document.getElementById('quickstart-oauthtoken').textContent = 'null';
            }
            document.getElementById('quickstart-sign-in').disabled = false;
        });

        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }

    useEffect(() => {
        initApp();
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <div className="col-5" style={{ background: 'white' }}>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                            aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                            aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form>
                            <div className="text-center mb-3">
                                <p>Sign in with:</p>
                                <button onClick={() => toggleSignIn('facebook')} type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>FB
                                </button>

                                <button onClick={() => toggleSignIn('google')} id="quickstart-sign-in" type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-google"></i>GG
                                </button>

                                <button onClick={() => toggleSignIn('twitter')} type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>TW
                                </button>

                                <button onClick={() => toggleSignIn('github')} type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-github"></i>GH
                                </button>
                            </div>

                            <p className="text-center">or:</p>

                            <div className="form-outline mb-4">
                                <input type="email" id="loginName" className="form-control" />
                                <label className="form-label" htmlFor="loginName">Email or username</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="loginPassword" className="form-control" />
                                <label className="form-label" htmlFor="loginPassword">Password</label>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6 d-flex justify-content-center">
                                    <div className="form-check mb-3 mb-md-0">
                                        <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                                        <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                    </div>
                                </div>

                                <div className="col-md-6 d-flex justify-content-center">
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={() => toggleSignIn('login')}>Sign in</button>

                            <div className="text-center">
                                <p>Not a member? <a href="#!">Register</a></p>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form>
                            <div className="text-center mb-3">
                                <p>Sign up with:</p>
                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-google"></i>
                                </button>

                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-link btn-floating mx-1">
                                    <i className="fab fa-github"></i>
                                </button>
                            </div>

                            <p className="text-center">or:</p>

                            <div className="form-outline mb-4">
                                <input type="text" id="registerName" className="form-control" />
                                <label className="form-label" htmlFor="registerName">Name</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" id="registerUsername" className="form-control" />
                                <label className="form-label" htmlFor="registerUsername">Username</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="email" id="registerEmail" className="form-control" />
                                <label className="form-label" htmlFor="registerEmail">Email</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="registerPassword" className="form-control" />
                                <label className="form-label" htmlFor="registerPassword">Password</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="registerRepeatPassword" className="form-control" />
                                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                            </div>

                            <div className="form-check d-flex justify-content-center mb-4">
                                <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                                    aria-describedby="registerCheckHelpText" />
                                <label className="form-check-label" htmlFor="registerCheck">
                                    I have read and agree to the terms
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                        </form>
                    </div>
                </div>

                {/* <!-- Container where we'll display the user details --> */}
                <div className="quickstart-user-details-container">
                    Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
                    <div>Firebase auth <code>currentUser</code> object value:</div>
                    <pre><code id="quickstart-account-details">null</code></pre>
                    <div>Google OAuth Access Token:</div>
                    <pre><code id="quickstart-oauthtoken">null</code></pre>
                </div>
            </div>

        </div>
    )
}
