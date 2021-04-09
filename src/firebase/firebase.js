import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyClG2HvDOhiTZMfKCCDdBhAVKolO0uj-e8',
  authDomain: 'dims-13.firebaseapp.com',
  projectId: 'dims-13',
  storageBucket: 'dims-13.appspot.com',
  messagingSenderId: '1053601047185',
  appId: '1:1053601047185:web:08b457cfa61944a1bb9530',
  measurementId: 'G-0Z06LEVEPN',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
