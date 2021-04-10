import firebase from './firebase';

export const createNewUser = async (email, password) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().sendPasswordResetEmail(email);
    return response;
  } catch (error) {
    console.error('Error with registration:', error);
    return null;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

    return response;
  } catch (error) {
    console.error('Error with login: ', error);

    return error;
  }
};
