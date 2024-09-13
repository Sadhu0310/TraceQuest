// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth'
//import { initializeApp } from "firebase/app";
//import { getAuth, getReactNativePersistence } from "firebase/auth";
//import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//import firebase from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdzgVkxNzvKEV1nb9Brj77f4W_t1nozY0",
  authDomain: "tracequest-eead6.firebaseapp.com",
  projectId: "tracequest-eead6",
  storageBucket: "tracequest-eead6.appspot.com",
  messagingSenderId: "913373248358",
  appId: "1:913373248358:web:93feaf70c65f24df51a6a7"
};


const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Get authentication object
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
