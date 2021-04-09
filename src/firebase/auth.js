import firebase from './firebase';

export function emailLinkSend(email, actionCodeSettings) {
  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export function emailLinkActionCodeSettings() {
  const actionCodeSettings = {
    url: 'dims-13.firebaseapp.com',
    handleCodeInApp: true,
  };
  return actionCodeSettings;
}
