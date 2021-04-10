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
