import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

console.log(process.env.REACT_APP_API_KEY, 'react');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,

  /*   REACT_APP_API_KEY'AIzaSyClG2HvDOhiTZMfKCCDdBhAVKolO0uj-e8'
        AUTH_DOMAIN='dims-13.firebaseapp.com'
PROJECT_ID='dims-13'
STORAGE_BUCKET='dims-13.appspot.com'
MESSAGING_SENDER_ID= '1053601047185'
APP_ID='1:1053601047185:web:08b457cfa61944a1bb9530'
MEASUREMENT_ID='G-0Z06LEVEPN' */

  /*   apiKey: 'AIzaSyClG2HvDOhiTZMfKCCDdBhAVKolO0uj-e8',
    authDomain: 'dims-13.firebaseapp.com',
    projectId: 'dims-13',
    storageBucket: 'dims-13.appspot.com',
    messagingSenderId: '1053601047185',
    appId: '1:1053601047185:web:08b457cfa61944a1bb9530',
    measurementId: 'G-0Z06LEVEPN', */
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
