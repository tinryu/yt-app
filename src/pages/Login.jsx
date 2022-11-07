import React, { useEffect } from 'react'
import { firebase, ui } from "../firebase/firebase.js";

export default function Login() {
    useEffect(() => {
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    return true;
                },
                uiShown: function () {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    scopes: [
                        'https://www.googleapis.com/auth/contacts.readonly'
                    ],
                    customParameters: {
                        prompt: 'select_account'
                    }
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    scopes: [
                        'public_profile',
                        'email',
                        'user_likes',
                        'user_friends'
                    ],
                    customParameters: {
                        // Forces password re-entry.
                        auth_type: 'reauthenticate'
                    }
                },
                firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                    forceSameDevice: false,
                    emailLinkSignIn: function () {
                        return {
                            url: 'https://www.example.com/completeSignIn?showPromo=1234',
                            // Custom FDL domain.
                            dynamicLinkDomain: 'example.page.link',
                            // Always true for email link sign-in.
                            handleCodeInApp: true,
                            // Whether to handle link in iOS app if installed.
                            iOS: {
                                bundleId: 'com.example.ios'
                            },
                            android: {
                                packageName: 'com.example.android',
                                installApp: true,
                                minimumVersion: '12'
                            }
                        };
                    }
                },
                firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
            tosUrl: '<your-tos-url>',
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);
    return (
        <>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </>
    )
}
