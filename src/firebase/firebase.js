import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default firebase;

export const setData = async (field, value, email) => {
  db.collection('data')
    .doc(field)
    .set(
      {
        [email]: value,
      },
      { merge: true },
    )
    .then(() => {
      console.log(`${email} data is written!`);
    })
    .catch((error) => {
      console.error('Error with saving:', error);
    });
};

export const getData = async (field) => {
  const data = await db.collection('data').doc(field);

  return data
    .get()
    .then((doc) => {
      if (doc.exists) {
        return Object.values(doc.data())[0];
      }
      console.error(`Cannot find ${field} data`);

      return null;
    })
    .catch((error) => {
      console.error('Error with data loading:', error);
    });
};
