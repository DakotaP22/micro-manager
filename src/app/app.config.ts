import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { AuthService } from './feature/auth/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'micro-manager-dp01',
        appId: '1:240698918201:web:da53c14f381c8b10ea14e8',
        storageBucket: 'micro-manager-dp01.firebasestorage.app',
        apiKey: 'AIzaSyBL61WG1EfjswoRi40lVVku6DNLhU_jJXA',
        authDomain: 'micro-manager-dp01.firebaseapp.com',
        messagingSenderId: '240698918201',
      })
    ),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099');
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      return firestore;
    }),
    provideAppInitializer(async () => {
      //ensure auth state is settled before app is initialized
      const authSvc = inject(AuthService);
      return firstValueFrom(
        toObservable(authSvc.user).pipe(filter((user) => user !== undefined))
      );
    }),
  ],
};
