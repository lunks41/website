import { initializeApp } from "firebase/app"
import { GoogleAuthProvider } from "firebase/auth"
// const googleProvider = new GoogleAuthProvider()
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBYUhj4nnH34s_Gc2SdDGlTo5eW77czxbc",
  authDomain: "balloons-dezen.firebaseapp.com",
  databaseURL:
    "https://balloons-dezen-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "balloons-dezen",
  storageBucket: "balloons-dezen.appspot.com",
  messagingSenderId: "925522445189",
  appId: "1:925522445189:web:b82da89f3d2cf98ac4baec",
  measurementId: "G-KWEJNV33BW",
}

const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig)
  
  return app
}

export default initializeFirebase
