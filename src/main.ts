import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import {
  add, addOutline,
  bodyOutline,
  cart, cartOutline,
  cashOutline,
  chevronBack,
  chevronForward,
  close,
  eyeOutline,
  fastFoodOutline,
  heart, heartOutline,
  home, homeOutline,
  lockClosedOutline,
  logOutOutline,
  mailOutline,
  menu, menuOutline,
  notificationsOutline,
  personCircleOutline,
  remove, removeOutline,
  search,
  star, starOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LOCALE_ID } from '@angular/core';


addIcons({
  home,
  homeOutline,
  heart,
  heartOutline,
  cart,
  cartOutline,
  add,
  addOutline,
  remove,
  removeOutline,
  menu,
  menuOutline,
  chevronForward,
  chevronBack,
  star,
  starOutline,
  search,
  close,
  eyeOutline,
  cashOutline,
  fastFoodOutline,
  bodyOutline,
  notificationsOutline,
  lockClosedOutline,
  personCircleOutline,
  mailOutline,
  logOutOutline
});

const firebaseConfig = {
  apiKey: "AIzaSyDwHDmfue9VuiI6Jb2yFIMgopk4Y-maCkA",
  authDomain: "mygym-59ddc.firebaseapp.com",
  projectId: "mygym-59ddc",
  storageBucket: "mygym-59ddc.firebasestorage.app",
  messagingSenderId: "930160386997",
  appId: "1:930160386997:web:3e1dd7bc34f90d15392ffc"
};


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
});
