import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
  ],
};
