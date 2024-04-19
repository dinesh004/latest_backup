import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';



const firebaseConfig = {
  apiKey: "AIzaSyDSo7HQnKUgYhlH36lvVfgFSl3STcdYGIc",
  authDomain: "government-project-99fa3.firebaseapp.com",
  databaseURL: "https://government-project-99fa3-default-rtdb.firebaseio.com",
  projectId: "government-project-99fa3",
  storageBucket: "government-project-99fa3.appspot.com",
  messagingSenderId: "723549354468",
  appId: "1:723549354468:web:7fe6b8bb747a77f8736ff1",
  measurementId: "G-37GDT1SGCP"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),// Toastr providers
    provideHttpClient(withFetch()),
    provideRouter(routes),
     provideClientHydration(),
      provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() =>initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule,


    ])]
};
