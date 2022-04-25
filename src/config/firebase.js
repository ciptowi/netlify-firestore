const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7bNICohSehTCrLfrQGXNVFTaxWBqnn-c",
  authDomain: "api-v01.firebaseapp.com",
  projectId: "api-v01",
  storageBucket: "api-v01.appspot.com",
  messagingSenderId: "289805051191",
  appId: "1:289805051191:web:d4788c4d9b647ea7d026b2",
  measurementId: "G-PVD6M0PNWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {db}