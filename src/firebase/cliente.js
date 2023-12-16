import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZLRGW43_LXphUTIhMYN8hfwA8SJeJcbM",
  authDomain: "w3dwaldo.firebaseapp.com",
  projectId: "w3dwaldo",
  storageBucket: "w3dwaldo.appspot.com",
  messagingSenderId: "1046454627410",
  appId: "1:1046454627410:web:c8597507a64c6ded4a438b",
  measurementId: "G-BVWWS3X6C1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  