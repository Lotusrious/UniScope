import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// .env 파일에서 환경 변수를 가져와 firebaseConfig 객체를 구성합니다.
// import.meta.env는 Vite에서 환경 변수를 읽는 방식입니다.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase 앱을 초기화합니다.
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스 객체를 초기화하고 내보냅니다.
// 다른 파일에서 이 db 객체를 import하여 Firestore를 사용할 수 있습니다.
export const db = getFirestore(app); 