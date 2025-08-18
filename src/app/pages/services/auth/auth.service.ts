import { Injectable, inject, signal, computed } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user as authUser,
  createUserWithEmailAndPassword,
  updateProfile,
  User
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  private user$ = authUser(this.auth);
  user = toSignal<User | null>(this.user$, { initialValue: null });

  displayName = computed(() => this.user()?.displayName ?? 'Usuário');

  email = computed(() => this.user()?.email ?? null); //Apenas se quiser usar esse cara em outro canto da aplicação.

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
  
  register(email: string, password: string, name: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then(cred => {
        if (cred.user) {
          return updateProfile(cred.user, { displayName: name });
        }
        return Promise.resolve();
      })
    );
  }
}
