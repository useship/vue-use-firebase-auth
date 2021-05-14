import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseConfig } from './types';

export const initializeApp = (firebaseConfig: FirebaseConfig) => {
  if (firebase.apps.length > 0) {
    return;
  }
  firebase.initializeApp(firebaseConfig);
  firebase.auth().useDeviceLanguage();
};

export function useFirebase() {
  return { firebaseAuth: firebase.auth() };
}
