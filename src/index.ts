import { App } from 'vue';
import { initializeApp } from './firebase';
import { useFirebaseAuth, provideFirebaseAuth } from './auth';
import { FirebaseConfig } from './types';

export default {
  install: (app: App, firebaseConfig: FirebaseConfig) => {
    initializeApp(firebaseConfig);
    provideFirebaseAuth(app);
  },
};

export { useFirebaseAuth };
