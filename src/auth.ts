import { reactive, toRefs, inject, App } from 'vue';

import { useFirebase } from './firebase';
import { FirebaseAuthState, UseFirebaseAuth } from './types';

const AuthSymbol = Symbol('FirebaseAuth');

export function useFirebaseAuth() {
  const result = inject<UseFirebaseAuth>(AuthSymbol);
  if (!result) {
    throw Error('No Auth provided');
  }
  return result;
}

export function provideFirebaseAuth(app: App) {
  const { firebaseAuth } = useFirebase();

  const state = reactive<FirebaseAuthState>({
    loading: true,
    signingIn: false,
    uid: null,
    user: null,
    credential: null,
  });

  firebaseAuth.onAuthStateChanged((user) => {
    state.user = user;
    state.uid = user ? user.uid : null;
    state.loading = false;
    state.signingIn = false;
  });

  async function signUpWithEmailAndPassword(email: string, password: string) {
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  async function signOut() {
    await firebaseAuth.signOut();
    state.user = null;
    state.uid = null;
    state.loading = false;
    state.signingIn = false;
  }

  app.provide(AuthSymbol, {
    ...toRefs(state),
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  });
}
