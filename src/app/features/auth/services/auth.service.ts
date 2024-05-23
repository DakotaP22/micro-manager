import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, idToken, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { map, startWith } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private auth = inject(Auth);
  user$ = user(this.auth);
  idToken$ = this.user$.pipe(map(user => !!user ? user.uid : null))
  isLoading$ = this.idToken$.pipe(map(token => token == undefined))
  isAuthenticated$ = this.idToken$.pipe(map(token => !!token));

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }


}
