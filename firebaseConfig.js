import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRkqYrDBJ-pd2T56mlUZORH19nQd3GTmU",
  authDomain: "aula-firebase20260610.firebaseapp.com",
  projectId: "aula-firebase20260610",
  storageBucket: "aula-firebase20260610.firebasestorage.app",
  messagingSenderId: "397184130089",
  appId: "1:397184130089:web:7e11457c501ebfd7815038"
};

// Inicializa o Firebase apenas se não existir
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa o Firestore
export const db = getFirestore(app);