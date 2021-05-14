import { ToRefs } from '@vue/reactivity';
import firebase from 'firebase/app';

export type FirebaseConfig = {
  apiKey: string;
  appId: string;
  projectId: string;
  authDomain: string;
};

export type FirebaseAuthState = {
  loading: boolean;
  signingIn: boolean;
  uid: string | null;
  user: firebase.User | null;
  credential: firebase.auth.AuthCredential | null;
};

type AuthFunctions = {
  signInWithTwitter: () => Promise<void>;
};

export type UseFirebaseAuth = AuthFunctions & ToRefs<FirebaseAuthState>;
