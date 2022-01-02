// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import * as DB from 'firebase/database';

// import { getAuth } from 'firebase/auth';
import * as Auth from 'firebase/auth';
// import { getStorage } from 'firebase/storage';
// Debug
import * as Storage from 'firebase/storage';

// This is gitignored, don't wanna have keys in the repo
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_DATABASE_URL,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from 'react-native-dotenv';

const FirebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  databaseUrl: FIREBASE_DATABASE_URL,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const db = DB.getDatabase(app, FirebaseConfig.databaseUrl);
const auth = Auth.getAuth(app);
const storage = Storage.getStorage(app);

// Helpers

// For some reason we have to "download" the file from the uri eve
// if its something internal ??? wtf
const blobFromUri = (uri : string) => new Promise<Blob>((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    resolve(xhr.response as Blob);
  };
  xhr.onerror = (e) => {
    reject(new TypeError(`Network request failed : ${e}`));
  };
  xhr.responseType = 'blob';
  xhr.open('GET', uri, true);
  xhr.send(null);
});

const uploadFile = async (
  uri : string,
  destination : Storage.StorageReference,
  metadata? : Storage.UploadMetadata | undefined,
) => {
  const blob = await blobFromUri(uri);
  await Storage.uploadBytes(destination, blob, metadata);

  return destination.fullPath;
};

const uploadFileToPath = async (
  uri : string,
  destinationPath : string,
  metadata? : Storage.UploadMetadata | undefined,
) => uploadFile(uri, Storage.ref(storage, destinationPath), metadata);

const addFileToUser = async (userId : string, path : string) => {
  // Why we don't use a list : https://stackoverflow.com/questions/39815117/add-an-item-to-a-list-in-firebase-database
  console.log(userId);
  const writeRef = DB.ref(db, `users/${userId}/files/${path}`);
  await DB.set(writeRef, { createdAt: new Date() });
};

const addProfileImage = async (userId : string, path : string) => {
  const writeRef = DB.ref(db, `users/${userId}/profileImg`);
  await DB.set(writeRef, { path });
};

const getAllImagesUrls = async () => {
  const imagesFolderRef = Storage.ref(storage, 'images/');
  const content = await Storage.listAll(imagesFolderRef);
  return Promise.all(content.items.map((imageRef) => Storage.getDownloadURL(imageRef)));
};

export default {
  config: FirebaseConfig,
  app,
  db,
  auth,
  storage,

  // Helpers

  uploadFile,
  uploadFileToPath,
  addFileToUser,
  addProfileImage,
  getAllImagesUrls,
};
