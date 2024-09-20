import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGyX__Hr0skwDN1261Dr6ACcNjJXjx_C4",
    authDomain: "foundationday2024-5b9fc.firebaseapp.com",
    projectId: "foundationday2024-5b9fc",
    storageBucket: "foundationday2024-5b9fc.appspot.com",
    messagingSenderId: "963738346010",
    appId: "1:963738346010:web:c7bae840b61eb9abd5e7a3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
