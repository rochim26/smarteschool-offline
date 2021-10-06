import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeIMzWUV3w1A39AZcV8NxICLlUh5SJLj4",
  authDomain: "smart-school-300211.firebaseapp.com",
  projectId: "smart-school-300211",
  storageBucket: "smart-school-300211.appspot.com",
  messagingSenderId: "429403777394",
  appId: "1:429403777394:web:de06e0f5e50868a38d95eb",
  measurementId: "G-V07WNQQYZQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const storage = firebase.storage().ref();
