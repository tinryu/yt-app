import React, { useEffect } from 'react'
import { firebase, ui } from "../firebase/firebase.js";

export default function Login() {
    useEffect(() => {
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    var user = authResult.user;
                    var credential = authResult.credential;
                    var isNewUser = authResult.additionalUserInfo.isNewUser;
                    var providerId = authResult.additionalUserInfo.providerId;
                    var operationType = authResult.operationType;
                    // Do something with the returned AuthResult.
                    // Return type determines whether we continue the redirect
                    // automatically or whether we leave that to developer to handle.
                    return true;
                },
                signInFailure: function (error) {
                    // Some unrecoverable error occurred during sign-in.
                    // Return a promise when error handling is completed and FirebaseUI
                    // will reset, clearing any UI. This commonly occurs for error code
                    // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                    // occurs. Check below for more details on this.
                    return handleUIError(error);
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            // Query parameter name for mode.
            queryParameterForWidgetMode: 'mode',
            // Query parameter name for sign in success url.
            queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    providerName: 'Google',
                    fullLabel: 'Sign in with ',
                    scopes: [
                        'https://www.googleapis.com/auth/contacts.readonly'
                    ],
                    customParameters: {
                        // Forces account selection even when one account
                        // is available.
                        prompt: 'consent'
                    },
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    providerName: 'Facebook',
                    fullLabel: 'Sign in with ',
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
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    providerName: 'Email',
                    fullLabel: 'Sign in with ',
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
                {
                    provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    providerName: 'Github',
                    fullLabel: 'Sign in with ',
                    
                },
                {
                    provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
                    providerName: 'Anonymous',
                    fullLabel: 'Sign in with ',
                }
            ],
            // Set to true if you only have a single federated provider like
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID and you would like to
            // immediately redirect to the provider's site instead of showing a
            // 'Sign in with Provider' button first. In order for this to take
            // effect, the signInFlow option must also be set to 'redirect'.
            immediateFederatedRedirect: false,
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: '<your-tos-url>',
            // Privacy policy url/callback.
            privacyPolicyUrl: function () {
                window.location.assign('<your-privacy-policy-url>');
            }
        };
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);
    return (
        <>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </>
    )
}
