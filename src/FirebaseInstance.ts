// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// This is gitignored, don't wanna have keys in the repo
import * as FirebaseEnvironment from '@env';

const FirebaseConfig = {
  apiKey: FirebaseEnvironment.FIREBASE_API_KEY,
  authDomain: FirebaseEnvironment.FIREBASE_AUTH_DOMAIN,
  projectId: FirebaseEnvironment.FIREBASE_PROJECT_ID,
  storageBucket: FirebaseEnvironment.FIREBASE_STORAGE_BUCKET,
  databaseUrl: FirebaseEnvironment.FIREBASE_DATABASE_URL,
  messagingSenderId: FirebaseEnvironment.FIREBASE_MESSAGING_SENDER_ID,
  appId: FirebaseEnvironment.FIREBASE_APP_ID,
  measurementId: FirebaseEnvironment.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const db = getDatabase(app, FirebaseConfig.databaseUrl);
const auth = getAuth(app);
const storage = getStorage(app);

export default {
  config: FirebaseConfig,
  app,
  db,
  auth,
  storage,
};
