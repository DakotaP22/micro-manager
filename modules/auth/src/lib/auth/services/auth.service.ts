import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user
} from '@angular/fire/auth';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/User';

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
	private userSvc = inject(UserService);

	constructor() {
		// this.logout();
	}

	auth$: Observable<AuthState> = user(this.auth).pipe(
		tap((user) => console.log(user)),
		switchMap((user) => {
			if (user === null) {
				return of(null);
      }
      
      return this.userSvc.getUser$(user.uid);
		}),
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
