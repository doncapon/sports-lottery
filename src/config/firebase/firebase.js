import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAFblv8_Mrvo2mQrEwKimN20AjrTTv9WwE",
  authDomain: process.env.REACT_HOME ,
  databaseURL: "https://betsoka-4b359-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "betsoka-4b359",
  storageBucket: "betsoka-4b359.appspot.com",
  messagingSenderId: "403545185392",
  appId: "1:403545185392:web:65116bbe5d9f054935a8b5",
  measurementId: "G-ZMV89B8RRV"
};

// Initialize Firebase
const fire = firebase.initializeApp(config);

export default fire;