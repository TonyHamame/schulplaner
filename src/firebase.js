import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD-eWeHQfMUrTzaKH24Vfx-VixryD7TRU8",
  authDomain: "schulp-30569.firebaseapp.com",
  projectId: "schulp-30569",
  storageBucket: "schulp-30569.appspot.com",
  messagingSenderId: "906040110483",
  appId: "1:906040110483:web:d4443ccb1202e9a1d14c66",
  databaseURL: "https://schulp-30569-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);