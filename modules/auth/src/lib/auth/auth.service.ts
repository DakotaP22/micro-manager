import { Injectable, inject } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map, tap } from 'rxjs';
import {
  Auth,
  user,
  User,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';

export type AuthState = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
};

const intialState: AuthState = {
  user: null,
  authenticated: false,
  loading: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor() {
    // this.logout(); 
  }

  auth$: Observable<AuthState> = user(this.auth).pipe(
    tap((user) => console.log(user)),
    map((user) => {
      if (user === null) {
        return {
          user: null,
          authenticated: false,
          loading: false,
        } as AuthState;
      } else {
        return {
          user,
          authenticated: true,
          loading: false,
        } as AuthState;
      }
    })
  );

  state = signalSlice({
    initialState: intialState,
    sources: [this.auth$],
    effects: (state) => ({
      stateChanged: () => {
        console.table(state());
      },
    }),
  });

  async login(email: string, password: string) {
    await setPersistence(this.auth, browserSessionPersistence);
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginAndPersist(email: string, password: string) {
    await setPersistence(this.auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
  }
}
