import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((cred) => this.mapFirebaseUser(cred.user))
    );
  }

  register(email: string, password: string): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(map((cred) => this.mapFirebaseUser(cred.user)));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  private mapFirebaseUser(user: FirebaseUser): User {
    return {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName ?? '',
    };
  }
}
