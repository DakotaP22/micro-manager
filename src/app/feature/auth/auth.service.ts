import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, signInWithPopup, user, GoogleAuthProvider, browserLocalPersistence } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly auth = inject(Auth);
    user = toSignal(user(this.auth), {initialValue: undefined});
    authenticated = computed(() => !!this.user());

    authenticateWithGoogle() {
        this.auth.setPersistence(browserLocalPersistence);
        signInWithPopup(this.auth, new GoogleAuthProvider());
    }

    constructor() {
        effect(() => {
            const user = this.user();

            if (user === null) {
                this.authenticateWithGoogle();
            }
        })
    }


    

}