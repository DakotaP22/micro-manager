import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAngularQuery(new QueryClient()),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'micro-manager-dp01',
          appId: '1:240698918201:web:da53c14f381c8b10ea14e8',
          storageBucket: 'micro-manager-dp01.appspot.com',
          apiKey: 'AIzaSyBL61WG1EfjswoRi40lVVku6DNLhU_jJXA',
          authDomain: 'micro-manager-dp01.firebaseapp.com',
          messagingSenderId: '240698918201',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
