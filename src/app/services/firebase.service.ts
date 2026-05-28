import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  Auth
} from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {

  private auth: Auth;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}