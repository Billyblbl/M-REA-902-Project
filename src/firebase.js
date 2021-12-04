// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// This is gitignored, don't wanna have keys in the repo
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app, firebaseConfig.databaseUrl);
const auth = getAuth(app);
const storage = getStorage(app);

export default {
  config: firebaseConfig,
  app,
  analytics,
  db,
  auth,
  storage,
};
