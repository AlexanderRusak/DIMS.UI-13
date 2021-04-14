import firebase from './firebase';

export const getRefFirebase = (docName) => {
  return firebase.firestore().collection('data').doc(docName);
};
