
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8eNv6hepW030cYIoQ0sPZQ9mclq9i8kE",
  authDomain: "photo-upload-wedding-edb04.firebaseapp.com",
  projectId: "photo-upload-wedding-edb04",
  storageBucket: "photo-upload-wedding-edb04.appspot.com",
  messagingSenderId: "1007037378525",
  appId: "1:1007037378525:web:c46f6d89b0e4c2d15fd034",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const storage = getStorage(app);
const db = getFirestore(app); // Modular syntax for Firestore

export { storage, db };
