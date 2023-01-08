// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSutXED7I0MH6NcKbY1Gx8MqRhibPaumk",
  authDomain: "chat-application-f2012.firebaseapp.com",
  projectId: "chat-application-f2012",
  storageBucket: "chat-application-f2012.appspot.com",
  messagingSenderId: "549781594755",
  appId: "1:549781594755:web:b99edd09bcb36721f831b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
