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

  // Converte o observable do Firebase User em Signal
  private user$ = authUser(this.auth);
  user = toSignal<User | null>(this.user$, { initialValue: null });

  // Computed que pega o displayName do usuário
  displayName = computed(() => this.user()?.displayName ?? 'Usuário');

  // Computed que pega o email (caso precise em algum lugar)
  email = computed(() => this.user()?.email ?? null);

  // Login
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Logout
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Cadastro
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
